스키마 및 테이블 생성 코드


CREATE DATABASE PD;
USE PD;

- - User 테이블
CREATE TABLE `User` (
`user_id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR(100) NOT NULL,
`email` VARCHAR(100) NOT NULL,
`password` VARCHAR(255) NOT NULL,
`profile` TEXT NULL,
`skills` TEXT NULL,
`role` VARCHAR(10) NOT NULL,
`category_id` INT NULL,
PRIMARY KEY (`user_id`)
);
- - Project 테이블
CREATE TABLE `Project` (
`project_id` INT NOT NULL AUTO_INCREMENT,
`title` VARCHAR(200) NOT NULL,
`description` TEXT NOT NULL,
`status` ENUM('모집 중', '진행 중', '완료') NOT NULL DEFAULT '모집 중',
`created_date` DATE NULL,
`user_id` INT NULL,
`duration` VARCHAR(100),
`part` VARCHAR(10),
`wanted` VARCHAR(25),
    
    process VARCHAR(100) null,
    PRIMARY KEY (`project_id`)
    );
    

- - Application 테이블
CREATE TABLE `Application` (
`application_id` INT NOT NULL AUTO_INCREMENT,
`status` ENUM('지원 중', '수락됨', '거절됨') NOT NULL DEFAULT '지원 중',
`user_id` INT NULL,
`project_id` INT NULL,
`message` VARCHAR(255),
PRIMARY KEY (`application_id`)
);
- - Team 테이블
CREATE TABLE `Team` (
`team_id` INT NOT NULL AUTO_INCREMENT,
`team_name` VARCHAR(100) NOT NULL,
`created_by` INT NOT NULL,
`project_id` INT NULL,
PRIMARY KEY (`team_id`)
);
- - TeamMember 테이블
CREATE TABLE `TeamMember` (
`TeamMember_id` INT NOT NULL AUTO_INCREMENT,
`role` VARCHAR(100) NULL,
`joined_date` DATE NULL,
`user_id` INT NULL,
`team_id` INT NULL,
PRIMARY KEY (`TeamMember_id`)
);
- - Category 테이블
CREATE TABLE `Category` (
`category_id` INT NOT NULL AUTO_INCREMENT,
`category` ENUM('개발', '영상/미디어', '문학', '음악') NULL,
PRIMARY KEY (`category_id`)
);
- - ProjectCategory 테이블
CREATE TABLE `ProjectCategory` (
`projectcategory_id` INT NOT NULL AUTO_INCREMENT,
`project_id` INT NULL,
`category_id` INT NULL,
PRIMARY KEY (`projectcategory_id`)
);
- - Portfolio 테이블
CREATE TABLE `Portfolio` (
`portfolio_id` INT NOT NULL AUTO_INCREMENT,
`title` VARCHAR(30) NULL,
`description` VARCHAR(255) NULL,
`part` VARCHAR(10) NULL,
`duration` VARCHAR(100) NULL,
`category_id` INT NULL,
`user_id` INT NULL,
PRIMARY KEY (`portfolio_id`)
);
- - CollabSuggest 테이블
CREATE TABLE `CollabSuggest` (
`collabsuggest_id` INT NOT NULL AUTO_INCREMENT,
`status` ENUM('지원 중', '수락됨', '거절됨') NULL,
`project_id` INT NULL,
`portfolio_id` INT NOT NULL,
`message` VARCHAR(255),
PRIMARY KEY (`collabsuggest_id`)
);
