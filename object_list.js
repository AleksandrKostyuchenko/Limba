ymaps.ready(init);

function init() {

    // Создание экземпляра карты.
    var myMap = new ymaps.Map('map', {
            center: [53.912420, 27.538196],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        }),
        // Контейнер для меню.
        menu = $('<ul uk-accordion></ul>');

    for (var i = 0, l = groups.length; i < l; i++) {
        createMenuGroup(groups[i]);
    }

    function createMenuGroup (group) {
        // Пункт меню.
        var menuItem = $('<li><a class="uk-accordion-title" href="#">' + group.name + '</a></li>'),
            // Коллекция для геообъектов группы.
            collection = new ymaps.GeoObjectCollection(null, { preset: group.style }),
            // Контейнер для подменю.
            submenu = $('<div class="uk-accordion-content"></div>');


        // Добавляем коллекцию на карту.
        myMap.geoObjects.add(collection);

        // Добавляем подменю.
        menuItem
            .append(submenu)
            // Добавляем пункт в меню.
            .appendTo(menu)
            // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.

        for (var j = 0, m = group.items.length; j < m; j++) {
            createSubMenu(group.items[j], collection, submenu);
        }
    }

    function createSubMenu (item, collection, submenu) {
        // Пункт подменю.
        var submenuItem = $('<p><a href="#">' + item.name + '</a></p>'),


            // Создаем метку.
            placemark = new ymaps.Placemark(item.center, {
                // Зададим содержимое заголовка балуна.
                balloonContentHeader: '<h4 class="uk-text-center">' + item.name + '</h4>',
                // Зададим содержимое основной части балуна.
                balloonContentBody: item.image,
                // Зададим содержимое нижней части балуна.
                balloonContentFooter: '<p style="font-size:14px;">' + item.description + '</p>',
                // Зададим содержимое всплывающей подсказки.
                hintContent: item.icon
            });

        // Добавляем метку в коллекцию.
        collection.add(placemark);
        // Добавляем пункт в подменю.
        submenuItem
            .appendTo(submenu)
            // При клике по пункту подменю открываем/закрываем баллун у метки.
            .find('a')
            .bind('click', function () {
                if (!placemark.balloon.isOpen()) {
                    placemark.balloon.open();
                } else {
                    placemark.balloon.close();
                }
                return false;
            });

    }

    // Добавляем меню в тэг BODY.
    menu.appendTo($('#magazine_map'));

}