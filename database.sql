create TABLE person(
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    _id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (_id)
);

create TABLE activity(
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    kindofactivity VARCHAR NOT NULL,
    _id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (_id),
    person_id INT NOT NULL,
    CONSTRAINT fk_person
        FOREIGN KEY (person_id)
            REFERENCES person(_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
);

create TABLE sportKind (
    name VARCHAR NOT NULL,
    code VARCHAR UNIQUE,
    _id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (_id)
);

create TABLE country (
    country_name VARCHAR NOT NULL UNIQUE,
    country_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (country_id)
);

create TABLE region (
    region_name VARCHAR NOT NULL UNIQUE,
    region_group INT NOT NULL,
    countryId INT NOT NULL,
    region_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (region_id),
    CONSTRAINT fk_country
        FOREIGN KEY (countryId)
        REFERENCES country(country_id)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
);

create TABLE town (
    town_name VARCHAR NOT NULL,
    town_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (town_id),
    countryId INT NOT NULL,
    regionId INT,
    UNIQUE (town_name, countryId),
    CONSTRAINT fk_country
        FOREIGN KEY (countryId)
        REFERENCES country(country_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION,
    CONSTRAINT fk_region
        FOREIGN KEY (regionId)
        REFERENCES region(region_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION
);

create TABLE sportHall (
    sportHall_name VARCHAR,
    address VARCHAR,
    sportHall_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (sportHall_id),
    town_id INT NOT NULL,
    UNIQUE (sportHall_name, town_id),
    CONSTRAINT fk_town
        FOREIGN KEY (town_id)
        REFERENCES town(town_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION
);

create TABLE place (
    town_id INT,
    sportHall_id INT,
    place_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (place_id),
    CONSTRAINT fk_town
        FOREIGN KEY (town_id)
        REFERENCES town(town_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION
);

create TABLE appointment (
    title VARCHAR NOT NULL,
    startDate DATE NOT NULL,
    finishDate DATE NOT NULL,
    duration INT NOT NULL,
    place_id INT NOT NULL,
    organizationsParticipants VARCHAR NOT NULL,
    sportKind_id INT NOT NULL,
    KPKV INT NOT NULL,
    character VARCHAR NOT NULL,
    participants VARCHAR NOT NULL,
    direction VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    organiser VARCHAR NOT NULL,
    _id INT GENERATED ALWAYS AS IDENTITY,
    person_id INT NOT NULL,
    PRIMARY KEY (_id),

);

INSERT INTO region(region_name, region_group, countryId )
    VALUES
        ('Автономна Республіка Крим', 1, 232),
        ('Вінницька область', 2, 232),
        ('Волинська область', 3, 232),
        ('Дніпропетровська область', 1, 232),
        ('Донецька область', 2, 232),
        ('Житомирська область', 3, 232),
        ('Закарпатська область', 3, 232),
        ('Запорізька область', 1, 232),
        ('Івано-Франківська область', 2, 232),
        ('Київська область', 3, 232),
        ('Кіровоградська область', 3, 232),
        ('Луганська область', 3, 232),
        ('Львівська область', 1, 232),
        ('Миколаївська область', 2, 232),
        ('Одеська область', 1, 232),
        ('Полтавська область', 2, 232),
        ('Рівненська область', 2, 232),
        ('Сумська область', 3, 232),
        ('Тернопільська область', 2, 232),
        ('Харківська область', 1, 232),
        ('Херсонська область', 3, 232),
        ('Хмельницька область', 2, 232),
        ('Черкаська область', 2, 232),
        ('Чернівецька область', 3, 232),
        ('Чернігівська область', 3, 232),
        ('місто Київ', 1, 232),
        ('місто Севастополь', 3, 232)
;

INSERT INTO sportkind(name, code)
    VALUES
        ('Бадмінтон ', 'І.001.'),
        ('Баскетбол ', 'І.002.'),
        ('Бейсбол ', 'І.003.'),
        ('Біатлон ', 'І.004.'),
        ('Бобслей ', 'І.005.'),
        ('Бокс ', 'І.006.'),
        ('Боротьба вільна ', 'І.007.'),
        ('Боротьба греко-римська ', 'І.008.'),
        ('Важка атлетика ', 'І.009.'),
        ('Велосипедний спорт ', 'І.010.'),
        ('Веслувальний слалом ', 'І.011.'),
        ('Веслування академічне ', 'І.012.'),
        ('Веслування на байдарках і каное ', 'І.013.'),
        ('Вітрильний спорт ', 'І.014.'),
        ('Водне поло ', 'І.015.'),
        ('Волейбол ', 'І.016.'),
        ('Волейбол пляжний ', 'І.017.'),
        ('Гандбол ', 'І.018.'),
        ('Гімнастика спортивна ', 'І.019.'),
        ('Гімнастика художня ', 'І.020.'),
        ('Гірськолижний спорт ', 'І.021.'),
        ('Гольф ', 'І.022.'),
        ('Дзюдо ', 'І.023.'),
        ('Кінний спорт ', 'І.024.'),
        ('Ковзанярський спорт ', 'І.025.'),
        ('Кьорлінг ', 'І.026.'),
        ('Легка атлетика ', 'І.027.'),
        ('Лижне двоборство ', 'І.028.'),
        ('Лижні гонки ', 'І.029.'),
        ('Плавання ', 'І.030.'),
        ('Плавання синхронне ', 'І.031.'),
        ('Регбі ', 'І.032.'),
        ('Санний спорт ', 'І.033.'),
        ('Сноубординг ', 'І.034.'),
        ('Софтбол ', 'І.035.'),
        ('Стрибки на батуті ', 'І.036.'),
        ('Стрибки на лижах з трампліна ', 'І.037.'),
        ('Стрибки у воду ', 'І.038.'),
        ('Стрільба з лука ', 'І.039.'),
        ('Стрільба кульова ', 'І.040.'),
        ('Стрільба стендова ', 'І.041.'),
        ('Сучасне п’‘ятиборство ', 'І.042.'),
        ('Теніс ', 'І.043.'),
        ('Теніс настільний ', 'І.044.'),
        ('Триатлон ', 'І.045.'),
        ('Тхеквондо (ВТФ), ', 'І.046.'),
        ('Фехтування ', 'І.047.'),
        ('Фігурне катання на ковзанах ', 'І.048.'),
        ('Фристайл ', 'І.049.'),
        ('Футбол ', 'І.050.'),
        ('Хокей з шайбою ', 'І.051.'),
        ('Хокей на траві ', 'І.052.'),
        ('Шорт-трек ', 'І.053.'),
        ('Скелетон ', 'І.054.'),
        ('Карате ', 'І.055.'),
        ('Скелелазіння ', 'І.056.'),
        ('Авіамодельний спорт ', 'ІІ.001.'),
        ('Автомобільний спорт ', 'ІІ.002.'),
        ('Автомодельний спорт ', 'ІІ.003.'),
        ('Айкідо ', 'ІІ.004.'),
        ('Аквабайк ', 'ІІ.005.'),
        ('Акробатичний рок-н-рол ', 'ІІ.006.'),
        ('Альпінізм ', 'ІІ.007.'),
        ('Американський футбол ', 'ІІ.008.'),
        ('Армспорт ', 'ІІ.009.'),
        ('Багатоборство тілоохоронців ', 'ІІ.010.'),
        ('Більярдний спорт ', 'ІІ.011.'),
        ('Богатирське багатоборство ', 'ІІ.012.'),
        ('Бодібілдинг ', 'ІІ.013.'),
        ('Бойове самбо ', 'ІІ.014.'),
        ('Боротьба Кураш ', 'ІІ.015.'),
        ('Боротьба на поясах ', 'ІІ.016.'),
        ('Боротьба на поясах Алиш ', 'ІІ.017.'),
        ('Боротьба самбо ', 'ІІ.018.'),
        ('Боулінг ', 'ІІ.019.'),
        ('Вейкбординг ', 'ІІ.020.'),
        ('Вертолітний спорт ', 'ІІ.021.'),
        ('Веслування на човнах "Дракон" ', 'ІІ.022.'),
        ('Військово-спортивні багатоборства ', 'ІІ.023.'),
        ('Воднолижний спорт ', 'ІІ.024.'),
        ('Водно-моторний спорт ', 'ІІ.025.'),
        ('Гирьовий спорт ', 'ІІ.026.'),
        ('Го ', 'ІІ.027.'),
        ('Годзю-рю карате ', 'ІІ.028.'),
        ('Голубиний спорт ', 'ІІ.029.'),
        ('Городковий спорт ', 'ІІ.030.'),
        ('Дартс ', 'ІІ.131.'),
        ('Дельтапланерний спорт ', 'ІІ.032.'),
        ('Джиу-джитсу ', 'ІІ.033.'),
        ('Естетична групова гімнастика ', 'ІІ.034.'),
        ('Змішані єдиноборства (ММА), ', 'ІІ.035.'),
        ('Карате JKA WF ', 'ІІ.036.'),
        ('Карате JKS ', 'ІІ.037.'),
        ('Карате WKC ', 'ІІ.038.'),
        ('Кікбоксинг WKA ', 'ІІ.040.'),
        ('Кікбоксинг WPKA ', 'ІІ.041.'),
        ('Кікбоксинг WАКО ', 'ІІ.042.'),
        ('Кікбоксинг ВТКА ', 'ІІ.043.'),
        ('Кіокушин карате ', 'ІІ.044.'),
        ('Кіокушинкай карате ', 'ІІ.045.'),
        ('Кіокушинкайкан карате ', 'ІІ.046.'),
        ('Козацький двобій ', 'ІІ.047.'),
        ('Комбат Дзю-Дзюцу ', 'ІІ.048.'),
        ('Кунгфу ', 'ІІ.050.'),
        ('Літаковий спорт ', 'ІІ.051.'),
        ('Міні-гольф ', 'ІІ.052.'),
        ('Морські багатоборства ', 'ІІ.053.'),
        ('Мотоциклетний спорт ', 'ІІ.054.'),
        ('Панкратіон ', 'ІІ.055.'),
        ('Парапланерний спорт ', 'ІІ.056.'),
        ('Парашутний спорт ', 'ІІ.057.'),
        ('Пауерліфтинг ', 'ІІ.058.'),
        ('Пейнтбол ', 'ІІ.059.'),
        ('Перетягування канату ', 'ІІ.060.'),
        ('Петанк ', 'ІІ.061.'),
        ('Підводний спорт ', 'ІІ.062.'),
        ('Планерний спорт ', 'ІІ.063.'),
        ('Пляжний гандбол ', 'ІІ.064.'),
        ('Пляжний футбол ', 'ІІ.065.'),
        ('Повітроплавальний спорт ', 'ІІ.066.'),
        ('Пожежно-прикладний спорт ', 'ІІ.067.'),
        ('Поліатлон ', 'ІІ.068.'),
        ('Професійний бокс ', 'ІІ.069.'),
        ('Радіоспорт ', 'ІІ.070.'),
        ('Ракетомодельний спорт ', 'ІІ.071.'),
        ('Регбіліг ', 'ІІ.072.'),
        ('Риболовний спорт ', 'ІІ.073.'),
        ('Роликовий спорт ', 'ІІ.074.'),
        ('Рукопашний бій ', 'ІІ.075.'),
        ('Сквош ', 'ІІ.076.'),
        ('Спорт із собаками ', 'ІІ.078.'),
        ('Спорт надлегких літальних апаратів ', 'ІІ.079.'),
        ('Спортивна аеробіка ', 'ІІ.080.'),
        ('Спортивна акробатика ', 'ІІ.081.'),
        ('Спортивне орієнтування ', 'ІІ.082.'),
        ('Спортивний бридж ', 'ІІ.083.'),
        ('Спортивний туризм ', 'ІІ.084.'),
        ('Спортивні танці ', 'ІІ.085.'),
        ('Спортінг ', 'ІІ.086.'),
        ('Стронгмен ', 'ІІ.088.'),
        ('Судномодельний спорт ', 'ІІ.089.'),
        ('Сумо ', 'ІІ.090.'),
        ('Таеквон-до І.Т.Ф. ', 'ІІ.091.'),
        ('Таїландський бокс Муей Тай ', 'ІІ.092.'),
        ('Танцювальний спорт ', 'ІІ.093.'),
        ('Традиційне карате ', 'ІІ.094.'),
        ('Українська боротьба на поясах ', 'ІІ.095.'),
        ('Український рукопаш "Спас" ', 'ІІ.096.'),
        ('Універсальний бій ', 'ІІ.097.'),
        ('Ушу ', 'ІІ.098.'),
        ('Фітнес ', 'ІІ.099.'),
        ('Флорбол ', 'ІІ.100.'),
        ('Французький бокс Сават ', 'ІІ.101.'),
        ('Фрі-файт ', 'ІІ.102.'),
        ('Фунакоші шотокан карате ', 'ІІ.103.'),
        ('Футзал ', 'ІІ.104.'),
        ('Хортинг ', 'ІІ.105.'),
        ('Черліденг ', 'ІІ.106.'),
        ('Шахи ', 'ІІ.107.'),
        ('Шашки ', 'ІІ.108.'),
        ('Шотокан карате-до С.К.І.Ф ', 'ІІ.109.'),
        ('Практична стрільба ', 'ІІ.110.'),
        ('Кйокушінкаі карате унія ', 'ІІ.111.'),
        ('Спорт з літаючим диском ', 'ІІ.112.'),
        ('Середньовічний бій ', 'ІІ.113.'),
        ('Кікбоксинг "Іска" ', 'ІІ.114.'),
        ('Комбат самозахист ІСО ', 'ІІ.115.'),
        ('Рукопаш гопак ', 'ІІ.116'),
        ('Грепплінг ', 'ІІ.118.'),
        ('Спортивний покер ', 'ІІ.119.'),
        ('Пляжна боротьба', 'ІІ.120.'),
        ('Кануполо', 'ІІ.121.'),
        ('Кіберспорт (електронний спорт),', 'ІІ.122.'),
        ('Кіокушин БуДо карате', 'ІІ.123.'),
        ('Поло', 'ІІ.124.'),
        ('Таеквон-До', 'ІІ.125.'),
        ('Армспорт ', 'ІІІ.001.'),
        ('Бадмінтон ', 'ІІІ.002.'),
        ('Баскетбол ', 'ІІІ.003.'),
        ('Баскетбол на візках ', 'ІІІ.004.'),
        ('Біатлон ', 'ІІІ.005.'),
        ('Більярдний спорт ', 'ІІІ.006.'),
        ('Боротьба вільна ', 'ІІІ.007.'),
        ('Боротьба греко-римська ', 'ІІІ.008.'),
        ('Боулінг ', 'ІІІ.009.'),
        ('Бочча ', 'ІІІ.010.'),
        ('Велосипедний спорт - трек ', 'ІІІ.011.'),
        ('Велосипедний спорт - шосе ', 'ІІІ.012.'),
        ('Веслування академічне ', 'ІІІ.013.'),
        ('Вітрильний спорт ', 'ІІІ.014.'),
        ('Водне поло ', 'ІІІ.015.'),
        ('Волейбол ', 'ІІІ.016.'),
        ('Волейбол сидячи ', 'ІІІ.017.'),
        ('Гандбол ', 'ІІІ.018.'),
        ('Гімнастика спортивна ', 'ІІІ.019.'),
        ('Гімнастика художня ', 'ІІІ.020.'),
        ('Гірськолижний спорт ', 'ІІІ.021.'),
        ('Голбол ', 'ІІІ.022.'),
        ('Дзюдо ', 'ІІІ.023.'),
        ('Карате ', 'ІІІ.024.'),
        ('Керлінг ', 'ІІІ.025.'),
        ('Керлінг на візках ', 'ІІІ.026.'),
        ('Кінний спорт ', 'ІІІ.027.'),
        ('Ковзанярський спорт ', 'ІІІ.028.'),
        ('Легка атлетика ', 'ІІІ.029.'),
        ('Лижні перегони', 'ІІІ.030.'),
        ('Параканое', 'ІІІ.031.'),
        ('Паратриатлон', 'ІІІ.032.'),
        ('Пауерліфтинг', 'ІІІ.033.'),
        ('Плавання', 'ІІІ.034.'),
        ('Пляжний волейбол', 'ІІІ.035.'),
        ('Регбі на візках', 'ІІІ.036.'),
        ('Риболовний спорт', 'ІІІ.037.'),
        ('Спортивне орієнтування', 'ІІІ.038.'),
        ('Спортивний туризм', 'ІІІ.039.'),
        ('Спортивні танці на візках', 'ІІІ.040.'),
        ('Стрільба з лука', 'ІІІ.041.'),
        ('Стрільба кульова', 'ІІІ.042.'),
        ('Теніс', 'ІІІ.043.'),
        ('Теніс на візках', 'ІІІ.044.'),
        ('Теніс настільний', 'ІІІ.045.'),
        ('Тхеквондо', 'ІІІ.046.'),
        ('Фехтування на візках', 'ІІІ.047.'),
        ('Футбол', 'ІІІ.048.'),
        ('Футзал', 'ІІІ.049.'),
        ('Шахи', 'ІІІ.050.'),
        ('Шашки', 'ІІІ.051.'),
        ('Гольф', 'ІІІ.052.')
;

INSERT INTO country(country_name)
 VALUES
            ('АФГАНІСТАН'),
            ('АЛБАНІЯ'),
            ('АНТАРКТИКА'),
            ('АЛЖИР'),
            ('АМЕРИКАНСЬКЕ САМОА'),
            ('АНДОРРА'),
            ('АНГОЛА'),
            ('АНТИГУА І БАРБУДА'),
            ('АЗЕРБАЙДЖАН'),
            ('АРГЕНТИНА'),
            ('АВСТРАЛІЯ'),
            ('АВСТРІЯ'),
            ('БАГАМСЬКІ ОСТРОВИ'),
            ('БАХРЕЙН'),
            ('БАНГЛАДЕШ'),
            ('ВІРМЕНІЯ'),
            ('БАРБАДОС'),
            ('БЕЛЬГІЯ'),
            ('БЕРМУДСЬКІ ОСТРОВИ'),
            ('БУТАН'),
            ('БОЛІВІЯ'),
            ('БОСНІЯ І ГЕРЦЕГОВИНА'),
            ('БОТСВАНА'),
            ('ОСТРІВ БУВЕ'),
            ('БРАЗИЛІЯ'),
            ('БЕЛІЗ'),
            ('БРИТАНСЬКА ТЕРИТОРІЯ В ІНДІЙСЬКОМУ ОКЕАНІ'),
            ('СОЛОМОНОВІ ОСТРОВИ'),
            ('ВІРГІНСЬКІ ОСТРОВИ'),
            ('БРУНЕЙ-ДАРУССАЛАМ'),
            ('БОЛГАРІЯ'),
            ('М''ЯНМА'),
            ('БУРУНДІ'),
            ('БІЛОРУСЬ'),
            ('КАМБОДЖА'),
            ('КАМЕРУН'),
            ('КАНАДА'),
            ('КАБО-ВЕРДЕ'),
            ('КАЙМАНОВІ ОСТРОВИ'),
            ('ЦЕНТРАЛЬНОАФРИКАНСЬКА РЕСПУБЛІКА'),
            ('ШРИ-ЛАНКА'),
            ('ЧАД'),
            ('ЧИЛІ'),
            ('КИТАЙ'),
            ('ТАЙВАНЬ, ПРОВІНЦІЯ КИТАЮ'),
            ('ОСТРІВ РІЗДВА'),
            ('КОКОСОВІ ОСТРОВИ'),
            ('КОЛУМБІЯ'),
            ('КОМОРИ'),
            ('МАЙОТТА'),
            ('КОНГО'),
            ('ОСТРОВИ КУКА'),
            ('КОСТА-РИКА'),
            ('ХОРВАТІЯ'),
            ('КУБА'),
            ('КІПР'),
            ('ЧЕХІЯ'),
            ('БЕНІН'),
            ('ДАНІЯ'),
            ('ДОМІНІКА'),
            ('ДОМІНІКАНСЬКА РЕСПУБЛІКА'),
            ('ЕКВАДОР'),
            ('САЛЬВАДОР'),
            ('ЕКВАТОРІАЛЬНА ГВІНЕЯ'),
            ('ЕФІОПІЯ'),
            ('ЕРИТРЕЯ'),
            ('ЕСТОНІЯ'),
            ('ФАРЕРСЬКІ ОСТРОВИ'),
            ('ФОЛКЛЕНДСЬКІ (МАЛЬВІНСЬКІ) ОСТРОВИ'),
            ('ПІВДЕННА ДЖОРДЖІЯ ТА ПІВДЕННІ САНДВІЧЕВІ ОСТРОВИ'),
            ('ФІДЖІ'),
            ('ФІНЛЯНДІЯ'),
            ('АЛАНДСЬКІ ОСТРОВИ'),
            ('ФРАНЦІЯ'),
            ('ФРАНЦУЗЬКА ГВІАНА'),
            ('ФРАНЦУЗЬКА ПОЛІНЕЗІЯ'),
            ('ФРАНЦУЗЬКІ ПІВДЕННІ ТЕРИТОРІЇ'),
            ('ДЖИБУТІ'),
            ('ГАБОН'),
            ('ГРУЗІЯ'),
            ('ГАМБІЯ'),
            ('ПАЛЕСТИНА'),
            ('НІМЕЧЧИНА'),
            ('ГАНА'),
            ('ГІБРАЛТАР'),
            ('КІРИБАТІ'),
            ('ГРЕЦІЯ'),
            ('ГРЕНЛАНДІЯ'),
            ('ГРЕНАДА'),
            ('ГВАДЕЛУПА'),
            ('ГУАМ'),
            ('ГВАТЕМАЛА'),
            ('ГВІНЕЯ'),
            ('ГАЯНА'),
            ('ГАЇТІ'),
            ('ОСТРІВ ГЕРД І ОСТРОВИ МАКДОНАЛД'),
            ('СВЯТИЙ ПРЕСТОЛ (ДЕРЖАВА-МІСТО ВАТИКАН)'),
            ('ГОНДУРАС'),
            ('ГОНКОНГ'),
            ('УГОРЩИНА'),
            ('ІСЛАНДІЯ'),
            ('ІНДІЯ'),
            ('ІНДОНЕЗІЯ'),
            ('ІРАН'),
            ('ІРАК'),
            ('ІРЛАНДІЯ'),
            ('ІЗРАЇЛЬ'),
            ('ІТАЛІЯ'),
            ('КОТ-Д''ІВУАР'),
            ('ЯМАЙКА'),
            ('ЯПОНІЯ'),
            ('КАЗАХСТАН'),
            ('ЙОРДАНІЯ'),
            ('КЕНІЯ'),
            ('КНДР'),
            ('КОРЕЯ'),
            ('КУВЕЙТ'),
            ('КИРГИЗСТАН'),
            ('ЛАОС'),
            ('ЛІВАН'),
            ('ЛЕСОТО'),
            ('ЛАТВІЯ'),
            ('ЛІБЕРІЯ'),
            ('ЛІВІЯ'),
            ('ЛІХТЕНШТЕЙН'),
            ('ЛИТВА'),
            ('ЛЮКСЕМБУРГ'),
            ('МАКАО'),
            ('МАДАГАСКАР'),
            ('МАЛАВІ'),
            ('МАЛАЙЗІЯ'),
            ('МАЛЬДІВИ'),
            ('МАЛІ'),
            ('МАЛЬТА'),
            ('МАРТИНІКА'),
            ('МАВРИТАНІЯ'),
            ('МАВРИКІЙ'),
            ('МЕКСИКА'),
            ('МОНАКО'),
            ('МОНГОЛІЯ'),
            ('МОЛДОВА'),
            ('ЧОРНОГОРІЯ'),
            ('МОНТСЕРРАТ'),
            ('МАРОККО'),
            ('МОЗАМБІК'),
            ('ОМАН'),
            ('НАМІБІЯ'),
            ('НАУРУ'),
            ('НЕПАЛ'),
            ('НІДЕРЛАНДИ'),
            ('КЮРАСАО'),
            ('АРУБА'),
            ('СІНТ-МАРТЕН (НІДЕРЛАНДСЬКА ЧАСТИНА)'),
            ('БОНАЙРЕ, СІНТ-ЕСТАТІУС І САБА'),
            ('НОВА КАЛЕДОНІЯ'),
            ('ВАНУАТУ'),
            ('НОВА ЗЕЛАНДІЯ'),
            ('НІКАРАГУА'),
            ('НІГЕР'),
            ('НІГЕРІЯ'),
            ('НІУЕ'),
            ('ОСТРІВ НОРФОЛК'),
            ('НОРВЕГІЯ'),
            ('ПІВНІЧНІ МАРІАНСЬКІ ОСТРОВИ'),
            ('МАЛІ ВІДДАЛЕНІ ОСТРОВИ США'),
            ('МІКРОНЕЗІЯ'),
            ('МАРШАЛЛОВІ ОСТРОВИ'),
            ('ПАЛАУ'),
            ('ПАКИСТАН'),
            ('ПАНАМА'),
            ('ПАПУА-НОВА ГВІНЕЯ'),
            ('ПАРАГВАЙ'),
            ('ПЕРУ'),
            ('ФІЛІППІНИ'),
            ('ПІТКЕРН'),
            ('ПОЛЬЩА'),
            ('ПОРТУГАЛІЯ'),
            ('ГВІНЕЯ-БІСАУ'),
            ('ТИМОР-ЛЕШТІ'),
            ('ПУЕРТО-РИКО'),
            ('КАТАР'),
            ('РЕЮНЬЙОН'),
            ('РУМУНІЯ'),
            ('РОСІЙСЬКА ФЕДЕРАЦІЯ'),
            ('РУАНДА'),
            ('СЕН-БАРТЕЛЕМІ'),
            ('ОСТРІВ СВЯТОЇ ЄЛЕНИ'),
            ('СЕНТ-КІТС І НЕВІС'),
            ('АНГІЛЬЯ'),
            ('СЕНТ-ЛЮСІЯ'),
            ('СЕН-МАРТЕН (ФРАНЦУЗСЬКА ЧАСТИНА)'),
            ('СЕН-П''ЄР І МІКЕЛОН'),
            ('СЕНТ-ВІНСЕНТ І ГРЕНАДІНИ'),
            ('САН-МАРИНО'),
            ('САН-ТОМЕ І ПРИНСІПІ'),
            ('САРК'),
            ('САУДІВСЬКА АРАВІЯ'),
            ('СЕНЕГАЛ'),
            ('СЕРБІЯ'),
            ('СЕЙШЕЛЬСЬКІ ОСТРОВИ'),
            ('СЬЄРРА-ЛЕОНЕ'),
            ('СИНГАПУР'),
            ('СЛОВАЧЧИНА'),
            ('В''ЄТНАМ'),
            ('СЛОВЕНІЯ'),
            ('СОМАЛІ'),
            ('ПІВДЕННА АФРИКА'),
            ('ЗІМБАБВЕ'),
            ('ІСПАНІЯ'),
            ('ПІВДЕННИЙ СУДАН'),
            ('СУДАН'),
            ('ЗАХІДНА САХАРА'),
            ('СУРИНАМ'),
            ('ШПІЦБЕРГЕН ТА ЯН-МАЄН'),
            ('СВАЗІЛЕНД'),
            ('ШВЕЦІЯ'),
            ('ШВЕЙЦАРІЯ'),
            ('СИРІЙСЬКА АРАБСЬКА РЕСПУБЛІКА'),
            ('ТАДЖИКИСТАН'),
            ('ТАЇЛАНД'),
            ('ТОГО'),
            ('ТОКЕЛАУ'),
            ('ТОНГА'),
            ('ТРИНІДАД І ТОБАГО'),
            ('ОБ''ЄДНАНІ АРАБСЬКІ ЕМІРАТИ'),
            ('ТУНІС'),
            ('ТУРЕЧЧИНА'),
            ('ТУРКМЕНИСТАН'),
            ('ОСТРОВИ ТЕРКС І КАЙКОС'),
            ('ТУВАЛУ'),
            ('УГАНДА'),
            ('УКРАЇНА'),
            ('РЕСПУБЛІКА МАКЕДОНІЯ'),
            ('ЄГИПЕТ'),
            ('ВЕЛИКА БРИТАНІЯ'),
            ('ГЕРНСІ'),
            ('ДЖЕРСІ'),
            ('ОСТРІВ МЕН'),
            ('ТАНЗАНІЯ'),
            ('США'),
            ('ВІРГІНСЬКІ ОСТРОВИ (США)'),
            ('БУРКІНА-ФАСО'),
            ('УРУГВАЙ'),
            ('УЗБЕКИСТАН'),
            ('ВЕНЕСУЕЛА'),
            ('УОЛЛІС І ФУТУНА'),
            ('САМОА'),
            ('ЄМЕН'),
            ('ЗАМБІЯ');

