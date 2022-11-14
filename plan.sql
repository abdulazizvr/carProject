create table cars (
    id  serial primary key,
    car_name varchar(15) not null unique,
    color varchar(10) not null,
    model varchar(10) not null,
    position int  not null,
    car_image varchar(100) default '/image/car.jpg',
    price smallint not null
);

create table users (
    id  serial primary key,
    first_name varchar(15) not null,
    last_name varchar(15) not null,
    contact varchar(13) not null unique,
    adress varchar(100) not null,
    image_link varchar(100) not null
);
drop table orders;
create table orders (
    id  serial,
    user_id int,
    car_id int, 
    is_pay boolean default false,
    add_date timestamp not null DEFAULT CURRENT_TIMESTAMP,
    foreign key (user_id) references users (id) on delete cascade,
    foreign key (car_id) references cars (id) on delete cascade  
);

insert into cars ( model, car_name, color, position, price, car_image) values
('mers','glendwagen','black', 1, 85,"/cars/1.jpg"),
('chevrolet','captiva','white', 3, 30,"/cars/1.jpg"),
('daewoo','gentra','black', 2, 15,"/cars/1.jpg"),
('ravon','spark','red', 2, 10,"/cars/1.jpg"),
('chevrolet','damas','white', 2, 10,"/cars/1.jpg"),
('chevrolet','malibu','black', 1, 35,"/cars/1.jpg"),
('bmw','b600','mocre', 4, 50,"/cars/1.jpg"),
('lexus','sinus','blue', 1, 65,"/cars/1.jpg"),
('mers','brabus','yellow', 5, 75,"/cars/1.jpg");

insert into users (first_name, last_name, contact, adress, image_link) values 
('Ikrom', 'Kamolov', '+998945462530','Toshkent','/users/nodir.jpg'),
('Eldor', 'Alimardonov', '+998945462531','Toshkent','/users/abbos.jpg'),
('Umar', 'Sobirov', '+998945462532','Toshkent','/users/3.jpg'),
('Akram', 'Islomov', '+998945462533','Toshkent','/users/4.jpg'),
('Orifjon', 'Jamolov', '+998945462534','Toshkent','/users/5.jpg'),
('Muhammad', 'Olimjonov', '+998945462535','Toshkent','/users/6.jpg'),
('Oqila', 'Malikova', '+998945462536','Toshkent','/users/7.jpg'),
('Malika', 'Sarvarova', '+998945462537','Toshkent','/users/8.jpg'),
('Mohir', 'Nabiev', '+998945462538','Toshkent','/users/9.jpg');


insert into orders( user_id, car_id, is_pay) values
(10, 5, true),
(11, 7, true),
(3, 4, true),
(4, 6, true),
(5, 9, false),
(6, 1, false),
(7, 2, false),
(8, 8, false),
(6, 4, true),
(6, 7, true),
(8, 4, true),
(4, 1, true),
(5, 7, false),
(5, 1, false),
(3, 2, false),
(8, 8, false),
(9, 3, true);