И.Погода:
Stack: Vite + React + TypeScript + Redux Toolkit + react-router-dom + Tailwind

16.09: 2.5 часа - создал проект, подключил зависимости, сверстал хедер, добавил функционал в инпут поиска населенных пунктов(change, clear)
1.5 часа - инициализировал store в redux toolkit, перенес запрос населенного пункта из useState логики в store, поработал с slice и типизированным react-redux хуками (тип useAppSelector вместо useSelector), начал тыкать асинхронные запросы, определил сущность нашей погоды в единицу времени

17.09: 1.5 часа - поработал с RTK query, все отлично подключилось
1 час - создал сущности под запрос, вроде все идеально сошлось, но не получается до сих пор вывести хотя бы температуры в компонент Home, надо будет поработать

18.09: 1.5 часа - поработал с api, настроил некоторые модели(типа weatherStateHourly и Daily)
1.5 часа - начал верстать и при этом разбираться в структуре запроса для маленьких блоков, где выводится инфа про каждый день
0.5 часа - продолжение работы
1 час - закончил работу с маленькими блоками, в constants выгрузил все картинки погоды, поработал с enum для вывода в строку состояния погоды

19.09: 2 часа - работа с Geolocation API для получения данных о местонахождении пользователя, декомпозиция некоторых компонентов, также начало работы с LiveSearch и поиск api для всех городов

20.09: 2.5 часа - было принято решение работать ipify, чтобы через ip получать местоположение пользователя(чтобы сразу получать город), а уже через dadataAPI получить город. То есть это плюс 2 api к нашему проекту. Было потрачено время на изучении документации, подключение api через RTK Query, но пока результата нет, так как пока не понял, как юзать одну api и оттуда результат кидать в другую. Также через dadataAPI будет устроен livesearch

21.09: 2.5 часа - выкинул идею с ip, потому что можно сделать легче с Geolocation API - нужно было правильно отправлять координаты (не через запятую), чтобы приходил город. Сделал подготовку к livesearch

23.09: 2.5 часа - реализовал liesearch, но упала tomorrow.io API. Точнее теперь нет поиска по городу, есть только поиск по формату «долгота, широта», что значительно усложняет работу приложения, так как из адреса тяжело вытаскивать формат «долгота, широта». Нужно либо менять основную API, либо костылить программу

24.09: 0 часов - сегодня было осмысление того, что делать дальше, учитывая, что больше api не работает так, как нужно для проекта. Решение простое: найти другую api. Этим и занимался весь день

25.09: 3.5 часа - перевел проект с tomorrow API на visual crossing API, начал реализовывать текущую погоду

26.09: 2.5 часа - реализация текущей погоды, разбирался как правильно кидать запрос и что именно он возвращает. Работа с размерностями, перевод некоторых размерностей в другие

27.09: 4 часа - работа с блоком текущей погоды, доставал всю инфу из api, думал над тем как реализовать почасовую погоду внутри этого блока

28.09: 4 часа - работал с бэкгранудом, почему - то тяжело было с tailwind css и background - image, в итоге решилось через style property, долго мучился с слайдером swiper is, в итоге смог

29.09: 2 часа - подключил слайдер и для прогноза, искал бэкграунды для каррент погоды

30.09: 1 час - задизейблил кнопки для прев и некст баттонов в слайдерах

1.10: 1.5 часа - блок с популярными городами и их текущей погодой

2.10: 4.5 часа - заверстал блок с восходом, закатом, фазой луны и УФ-индексом

3.10: 2 часа - сбилась позиция луны, пришлось с этими посидеть полтора часа, начал формировать utils из всех функций, которые локально находятся в компонентах

4.10: 3 часа - закончил utils, начал делать прогноз погоды на 2 недели вперед в карточках на основной странице, начал работу с table(первый раз)

5.10: 1 час - продолжил работу с этим списком, colspan странно себя вели, нужно было задавать tr с пустыми значением в начале, чтобы дальше колонки шли как нужно

6.10: 2.5 часа - закончил работу с списком 2 недель погоды, home завершен. Есть нюансы по отдельным виджетам, но это на уровне всего приложения

7.10: 3 часа - подобрал бэкграунды для всех состояний погоды(на снег и дождь почти везде одинаковый бэкграунд, потому что уже было лень искать). Думал, как можно избежать ошибок при синхронизации подсказок и основной api погоды - есть вариант предлагать выбрать другие населенные пункты при ошибке, но тогда придется подгружать и проверять, работают ли оставшиеся варианты наверняка(дорого по запросам и ресурсам)

8.10: 3 часа - были ошибочные вызовы api при пустом searchValue, на помощь пришла опция skip у встроенного в RTK Query хука useFetch(). Таким образом, избавился от 400 ошибки в начале работы, теперь консоль пустая всегда. Также это помогло от лишнего вызова в подсказках. Для начального местоположения был выбран способ обратного геокодирования от dadata api, через которую реализованы и подсказки

9.10: 1.5 часа - начал работу над страничкой погоды на месяц вперед, продумывал структуру таблички и структуру запросов(был вопрос, нужно ли экономить 1 запрос и не вызывать все через dataRange - пока экономим, но хочется все одним запросом)

10.10: 1 час - пытался засунуть все в табличку, написал нужные запросы - вроде получилось

11.10: 4 часа - доделал табличку, но остался прикол с тем, что дата считается по моему местонахождению, сложности с применением getCurrentTime() из utils - нужно решить. Начал работать с charts js - пока вообще непонятно за стилизацию и вообще как засовывать данные

12.10: 4 часа - доделал line chart и pie chart, никак не могу разобраться с getCurrentTime()

13.10: 2 часа - придумал свою замену (лютую через костыль) getCurrentTime() и доделывал по мелочи

14.10: 2.5 часа - размерность PieChart фиксил, потом закастомил legend labels

15.10: 2 часа - пытался разобраться с annotations. Очень стремно написана документация chart js. Без примеров очень тяжело разобраться что к чему относится

16.10: 5.5 часов - разобрался с annotations и сделал роуты в DayPage, но пока работают криво, так как там рендерится DayDetail, который содержит hours, но после 15 дней такого поля нет. Нужно переделывать

17.10: 2.5 часа - делал все 4 графика LineChart, затем реализовывал табы, которые переключают эти 4 графика между собой, везде annotations добавил и максимальный элемент высчитывал динамически, чтобы annotations не улетали за график

18.10: 2 часа - работал над тем, чтобы синхронизировать две апишки. В голову пришла гениальная идея: выводить только те подсказки, у которых есть широта, долгота. Прокидывать их в запрос для погоды, а потом через обратное геокодирование вытаскивать название города(работает!!!)

19.10: 1 час - дизейблил дни, которые больше 15 от текущего, чтобы нельзя было переходить в детальный день

20.10: 2 часа - дорабатывал страницу с месячной погодой, обрабатывал ошибку с переходом в город, у которого не прогружены дни дальше 15(обычно сельская местность)

21.10: 1.5 часа - делал так, чтобы пользователь мог выбрать регион, но теперь ему выводились самые популярные города этого региона и он уже выбирал из них

22.10: 1 час - изучал как вообще работать с блокированием геоданных, почитал пару статей и сохранил их, чтобы завтра применить 

23.10: 1.5 часа - разбирался с тем что делать, если пользователь отказывается давать данные. Сверстал попап, чтобы пользователь мог дать разрешение через сайт, но вроде так нельзя. Тогда будем кидать запрос через ip пользователя, а потом искать погоду по этому городу

24.10: 3.5 часа - теперь на сайте вне зависимости от разрешения пользователя на получение геолокации определяется местоположение. Точность хромает, но здесь тяжело что - то сделать. Также добавил загрузку на месячный прогноз

25.10: 1.5 часа - адаптация под мобилку

26.10: 4 часа - адаптация под мобилку

27.10: 1.5 часа - адаптация под мобилку

28.10: 2.5 часа - задеплоил проект на gh-pages. Немного пришлось повозиться, так как первый раз деплоил проект на vote, но все получилось. Проект завершен

Общее время, затраченное на проект: 106 часов
