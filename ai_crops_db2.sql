CREATE DATABASE ai_crop;

USE ai_crop;

-- drop database ai_crop;

CREATE TABLE measurement_type ( -- done
	measurement_type_id TINYINT UNSIGNED PRIMARY KEY,
	measurement_type_name VARCHAR (30) NOT NULL,
    unit VARCHAR (10)
);

CREATE TABLE user ( 
	user_id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_type TINYINT UNSIGNED NOT NULL DEFAULT(2),  -- 1: admin, 2: user, 3: collaborator
	first_name VARCHAR (20) NOT NULL,
    last_name VARCHAR (20),
	email VARCHAR (100) NOT NULL UNIQUE,
	password VARCHAR (200) NOT NULL,
    dni VARCHAR (15) UNIQUE,
	phone VARCHAR (20),
    address VARCHAR (200),
	post_code VARCHAR (10),
	city VARCHAR (100),
    country VARCHAR (50),
	user_knowledge VARCHAR (100),
    user_photo VARCHAR(200),
    user_since DATETIME NOT NULL DEFAULT(now()),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    is_disabled BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE greenhouse ( -- done
	greenhouse_id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_owner_id MEDIUMINT UNSIGNED NOT NULL,
    greenhouse_name VARCHAR (100) NOT NULL,
    greenhouse_location VARCHAR (100) NOT NULL,
	greenhouse_latitude DECIMAL(10,7),
    greenhouse_longitude DECIMAL(10,7),
    greenhouse_orientation VARCHAR (10) NOT NULL,
    greenhouse_type VARCHAR (50) NOT NULL,
    greenhouse_size SMALLINT UNSIGNED NOT NULL,
    responsibility_acknowledged BOOLEAN NOT NULL DEFAULT FALSE,
    greenhouse_create_date DATETIME NOT NULL DEFAULT(now()),
	greenhouse_is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
	CONSTRAINT fk_user_2 FOREIGN KEY (user_owner_id) 
    REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_greenhouse ( -- done
	user_greenhouse_id MEDIUMINT UNSIGNED AUTO_INCREMENT UNIQUE,
    user_id MEDIUMINT UNSIGNED NOT NULL,
    greenhouse_id MEDIUMINT UNSIGNED NOT NULL,
    user_greenhouse_distance SMALLINT UNSIGNED, -- NOT NULL EN EL FUTURO!
	PRIMARY KEY (user_id,greenhouse_id),
	CONSTRAINT fk_user_1 FOREIGN KEY (user_id) 
    REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_greenhouse_1 FOREIGN KEY (greenhouse_id) 
    REFERENCES greenhouse(greenhouse_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE helper ( -- done
	helper_id MEDIUMINT UNSIGNED AUTO_INCREMENT UNIQUE,
    greenhouse_id MEDIUMINT UNSIGNED NOT NULL,
    helper_first_name VARCHAR (100) NOT NULL,
	helper_last_name VARCHAR (100),
    helper_email VARCHAR (100) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY (greenhouse_id, helper_email),
	CONSTRAINT fk_greenhouse_5 FOREIGN KEY (greenhouse_id) 
    REFERENCES greenhouse(greenhouse_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE crop ( -- done
	crop_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    greenhouse_id MEDIUMINT UNSIGNED NOT NULL,
    crop_name VARCHAR (50) NOT NULL,
    crop_duration TINYINT UNSIGNED NOT NULL,
    crop_start_date DATETIME NOT NULL DEFAULT(now()),
	crop_end_date DATETIME,
    crop_plant_variety VARCHAR (200),
    crop_size SMALLINT UNSIGNED NOT NULL,
    is_active  BOOLEAN NOT NULL DEFAULT TRUE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
	CONSTRAINT fk_greenhouse_3 FOREIGN KEY (greenhouse_id) 
    REFERENCES greenhouse(greenhouse_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE greenhouse_measurement_type ( -- done
	greenhouse_measurement_type_id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    greenhouse_id MEDIUMINT UNSIGNED NOT NULL,
	measurement_type_id TINYINT UNSIGNED NOT NULL,
    max DECIMAL(6,2) NOT NULL,
    min DECIMAL(6,2) NOT NULL,
	CONSTRAINT fk_greenhouse_2 FOREIGN KEY (greenhouse_id) 
    REFERENCES greenhouse(greenhouse_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_measurement_type_1 FOREIGN KEY (measurement_type_id) 
    REFERENCES measurement_type(measurement_type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE measure ( -- done   
	measure_id BIGINT UNSIGNED AUTO_INCREMENT,
    greenhouse_id MEDIUMINT UNSIGNED NOT NULL,
	measurement_type_id TINYINT UNSIGNED NOT NULL, 
    measure_value DECIMAL(6,2) NOT NULL,
    measure_date_time DATETIME NOT NULL DEFAULT(now()),
    PRIMARY KEY (measure_id, greenhouse_id, measurement_type_id),
	CONSTRAINT fk_greenhouse_4 FOREIGN KEY (greenhouse_id) 
    REFERENCES greenhouse(greenhouse_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_measurement_type_2 FOREIGN KEY (measurement_type_id) 
    REFERENCES measurement_type(measurement_type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE alarm ( -- done
	alarm_id BIGINT UNSIGNED AUTO_INCREMENT,
    measure_id BIGINT UNSIGNED NOT NULL,
    greenhouse_id MEDIUMINT UNSIGNED NOT NULL,
    measurement_type_id TINYINT UNSIGNED NOT NULL,
    alarm_date_time DATETIME NOT NULL DEFAULT(now()),
    alarm_message VARCHAR(200) NOT NULL,
    alarm_measure DECIMAL(6,2) NOT NULL,
    high_low VARCHAR(4) NOT NULL,
	is_active BOOLEAN DEFAULT TRUE NOT NULL,
    alarm_closing_message VARCHAR(200),
	alarm_end_date_time DATETIME,
    PRIMARY KEY (alarm_id, measure_id, greenhouse_id, measurement_type_id),
	CONSTRAINT fk_measure_1 FOREIGN KEY (measure_id, greenhouse_id, measurement_type_id) 
    REFERENCES measure(measure_id, greenhouse_id, measurement_type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE notification ( -- done
	notification_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    alarm_id BIGINT UNSIGNED NOT NULL,
    notification_date DATETIME NOT NULL DEFAULT(now()),
    notification_email VARCHAR (100) NOT NULL,
	CONSTRAINT fk_alarm_1 FOREIGN KEY (alarm_id) 
    REFERENCES alarm(alarm_id) ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO user (user_type, first_name, last_name, email, password, dni, phone, address, post_code, city, country, user_knowledge) VALUES 
	(1,'Admin',NULL,'admin@admin.com','$2b$08$xkylBqiFoHZGUfalGpH7p.GeMEeRkWTwhYzH5489WxnCMA1lTZaha',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(2,'Javier','Morera','javimorera90@hotmail.com','$2b$08$LbHxfcgKpSbHkRk4H99zW.RnuVH0WGb7MJEzvhqS0qWdnyEgrflx.','55215250R',657148469,'Avenida Manzanares 196',28026,'Madrid','España','Técnico en agricultura tradicional'),
	(2,'Omar','Perez','omar@gmail.com','$2b$08$LbHxfcgKpSbHkRk4H99zW.RnuVH0WGb7MJEzvhqS0qWdnyEgrflx.','15214250R',654987321,'address55555',28026,'Malaga','España','Técnico en agricultura hidropónica'),
	(2,'Camila','Sanchez','camila@gmail.com','$2b$08$LbHxfcgKpSbHkRk4H99zW.RnuVH0WGb7MJEzvhqS0qWdnyEgrflx.','65321487H',123456789,'address55555',28026,'Sevilla','España','Técnico en agricultura hidropónica'),
    (2,'Rocío','Orellana','rocio@gmail.com','$2b$08$LbHxfcgKpSbHkRk4H99zW.RnuVH0WGb7MJEzvhqS0qWdnyEgrflx.','65321387H',123451789,'address55555',28026,'Bilbao','España','Técnico en agricultura hidropónica');


    INSERT INTO greenhouse VALUES 
	(1,5,'Invernadero de Lechuga','Madrid',NULL,NULL,'S',1,10,1,'2023-03-15',0),
	(2,2,'Invernadero de Remolacha','Granada',NULL,NULL,'N',1,2,1,'2023-03-15',0),
	(3,3,'Invernadero de Albahaca','Malaga',NULL,NULL,'NO',1,50,1,'2023-03-15',0),
	(4,4,'Invernadero de Perejil','Jaen',NULL,NULL,'SE',1,300,1,'2023-03-15',0),
    (5,5,'Invernadero de Pepino','Toledo',NULL,NULL,'S',1,50,1,'2023-03-15',0),
	(6,2,'Invernadero de Flores Silvestres','Vigo',NULL,NULL,'S',1,10,1,'2023-03-15',0),
	(7,3,'Invernadero de Acelga','Huesca',NULL,NULL,'N',1,2,1,'2023-03-15',0),
	(8,4,'Invernadero de Espinacas','Bilbao',NULL,NULL,'NO',1,50,1,'2023-03-15',0);
    

    INSERT INTO user_greenhouse (user_id, greenhouse_id) VALUES
	(5,2),
    (2,3),
    (3,4),
    (4,5),
    (2,6),
    (3,7),
    (4,8);
    
    INSERT INTO crop (greenhouse_id, crop_name, crop_duration, crop_plant_variety, crop_size) VALUES 
    (1, "Lechuga", 40, "Lechuga romana", 10);
	INSERT INTO crop (greenhouse_id, crop_name, crop_duration, crop_plant_variety, crop_size) VALUES 
    (2, "Remolacha", 28, "Remolacha Roja", 20);
    INSERT INTO crop (greenhouse_id, crop_name, crop_duration, crop_plant_variety, crop_size) VALUES
	(3, "Albahaca", 45, "Albahca India", 15);
    INSERT INTO crop (greenhouse_id, crop_name, crop_duration, crop_plant_variety, crop_size) VALUES
    (4, "Perejil", 35, "Perejil de Génova", 25);
    INSERT INTO crop (greenhouse_id, crop_name, crop_duration, crop_plant_variety, crop_size) VALUES
    (5, "Pepino", 30, "Pepinus sativum L", 30);
	INSERT INTO crop (greenhouse_id, crop_name, crop_duration, crop_plant_variety, crop_size) VALUES
    (6, "Flores", 30, "Caléndulas", 30);
	INSERT INTO crop (greenhouse_id, crop_name, crop_duration, crop_plant_variety, crop_size) VALUES
    (7, "Acelga", 30, "Acelga gigante", 30);
	INSERT INTO crop (greenhouse_id, crop_name, crop_duration, crop_plant_variety, crop_size) VALUES
    (8, "Espinaca", 30, "Espinaca azul", 30);
    
    
        INSERT INTO helper (greenhouse_id, helper_first_name, helper_last_name, helper_email) VALUES 
    (1, "Esteban", "Quito", "esteban@gmail.com");
        INSERT INTO helper (greenhouse_id, helper_first_name, helper_last_name, helper_email) VALUES 
    (2, "Aitor", "Tilla", "aitor@gmail.com");
        INSERT INTO helper (greenhouse_id, helper_first_name, helper_last_name, helper_email) VALUES 
    (3, "Lola", "Mento", "lola@gmail.com");
        INSERT INTO helper (greenhouse_id, helper_first_name, helper_last_name, helper_email) VALUES 
    (1, "Elsa", "Pato", "elsa@gmail.com");
            INSERT INTO helper (greenhouse_id, helper_first_name, helper_last_name, helper_email) VALUES 
    (5, "Mónica", "Galindo", "monica@gmail.com");
    
	INSERT INTO measurement_type (measurement_type_id, measurement_type_name, unit) VALUES 
		(1, "Temperatura", "ºC"),
        (2, "CO2", "ppm"),
        (3, "Humedad", "%"),
        (4, "Luz solar", "nm"),
        (5, "PH", ""),
        (6, "Conductividad", "mS/cm"),
        (7, "Humedad de la hoja", "%");
        
        
  	INSERT INTO greenhouse_measurement_type (greenhouse_id, measurement_type_id, max, min) VALUES 
		(1, 1, 26, 16),
		(1, 2, 150, 80),
        (1, 3, 90, 40),
		(1, 4, 6000, 1500),
		(1, 5, 7.1, 5.5),
		(1, 6, 1.8, 1.4),
		(1, 7, 71, 55),
		(2, 1, 26, 18),
		(2, 2, 120, 70),
        (2, 3, 90, 50),
		(2, 4, 6500, 3500),
		(2, 5, 7.4, 4.5),
		(2, 6, 2.2, 1.6),
		(2, 7, 88, 64),
		(3, 1, 23, 14),
		(3, 2, 170, 80),
        (3, 3, 95, 50),
		(3, 4, 4000, 1000),
		(3, 5, 6.5, 5.1),
		(3, 6, 2.8, 1.7),
		(3, 7, 65, 50),
		(4, 1, 27, 16),
		(4, 2, 130, 60),
        (4, 3, 80, 30),
		(4, 4, 7500, 2000),
		(4, 5, 6.6, 4.7),
		(4, 6, 1.9, 1.1),
		(4, 7, 77, 57),
		(5, 1, 23, 11),
		(5, 2, 145, 90),
        (5, 3, 75, 45),
		(5, 4, 3000, 2000),
		(5, 5, 7.8, 5.9),
		(5, 6, 2.1, 1.2),
		(5, 7, 63, 45),
		(6, 1, 28, 14),
		(6, 2, 150, 70),
        (6, 3, 90, 40),
		(6, 4, 6000, 1500),
		(6, 5, 7.1, 5.5),
		(6, 6, 1.8, 1.4),
		(6, 7, 71, 55),
		(7, 1, 28, 14),
		(7, 2, 150, 70),
        (7, 3, 90, 40),
		(7, 4, 6000, 1500),
		(7, 5, 7.1, 5.5),
		(7, 6, 1.8, 1.4),
		(7, 7, 71, 55),
		(8, 1, 27, 16),
		(8, 2, 130, 60),
        (8, 3, 80, 30),
		(8, 4, 7500, 2000),
		(8, 5, 6.6, 4.7),
		(8, 6, 1.9, 1.1),
		(8, 7, 77, 57);

		SELECT * FROM measurement_type;
		SELECT * FROM user;
		SELECT * FROM greenhouse;
		SELECT * FROM user_greenhouse;
		SELECT * FROM helper;
		SELECT * FROM crop;
		SELECT * FROM greenhouse_measurement_type;
		SELECT * FROM measure;
		SELECT * FROM alarm;
		SELECT * FROM notification;
        