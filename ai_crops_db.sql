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
    dni VARCHAR (15),
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

-- esta vista nos muestra el nombre del dueño del invernadero y el numero de invernadero
CREATE VIEW owner_name AS SELECT greenhouse.greenhouse_id, CONCAT(user.first_name, " ", user.last_name) as owner_full_name FROM user, greenhouse WHERE user.user_id = greenhouse.user_owner_id;
CREATE VIEW active_greenhouses AS SELECT greenhouse_id, user_owner_id, 1 as num FROM greenhouse WHERE greenhouse_is_deleted = 0;

INSERT INTO user (user_type, first_name, last_name, email, password, dni, phone, address, post_code, city, country, user_knowledge) VALUES 
(1,'Admin',NULL,'admin@admin.com','$2b$08$xkylBqiFoHZGUfalGpH7p.GeMEeRkWTwhYzH5489WxnCMA1lTZaha',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
    
INSERT INTO measurement_type (measurement_type_id, measurement_type_name, unit) VALUES 
(1, "Temperatura", "ºC"),
(2, "CO2", "ppm"),
(3, "Humedad", "%"),
(4, "Luz solar", "nm"),
(5, "PH", ""),
(6, "Conductividad", "mS/cm"),
(7, "Humedad de la hoja", "%");
    


        
        