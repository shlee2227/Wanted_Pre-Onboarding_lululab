# 룰루랩 - 병원 예약 시스템 구축하기


원티드 프리온보딩 백엔드 코스 ```룰루랩 - 병원 예약 시스템 구축하기``` 과제에 대한 페이지입니다.  

- 개발기간: 2022.10.17 - 2022.10.19 (3일)
- 개발인원: 이신희 (1명)



## 프로젝트 실행 방법

- 사전에 Git, node, MySQL이 설치되어있어야 합니다.

```shell
# 레포지토리 클론
$ git clone https://github.com/J-EUM/pre-onboarding-3rd-hypercloud.git

# 패키지 설치
$ npm install

# 데이터베이스 생성
mysql> create database 데이터베이스명 character set utf8mb4 collate utf8mb4_general_ci; 

# .env파일 만들기
.env
DATABASE_URL = mysql://DB유저이름:DB비밀번호@DB호스트:DB포트/DB명
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = DB호스트
TYPEORM_PORT = DB포트
TYPEORM_USERNAME = DB유저이름
TYPEORM_PASSWORD = DB비밀번호
TYPEORM_DATABASE = DB명
TYPEORM_LOGGING =TRUE

# 데이터베이스 테이블 생성
$ dbmate up

# 프로젝트 실행
$ npm start nodemon server.js

```


## 프로젝트 구조
### DB모델링
[DB Diagram Link](https://dbdiagram.io/d/634caadef0018a1c5f15ca47)

![_ wanted Pre Onboarding 4rd back lululab](https://user-images.githubusercontent.com/107532513/196477146-219f613b-fe93-4dc5-a5a7-8718cf14ebea.png)


## 구현 기능

#### 1. 예약 내역 가져오기
등록된 예약 내역을 예약번호 혹은 환자명을 통해 가져옵니다. 

#### 2. 예약 하기  
예약에 필요한 정보를 받아 새로운 예약을 생성합니다.   
동일 환자 혹은 병원의 동일시간에 대한 중복 예약은 생성할 수 없습니다.  
특정 병원에 No Show 기록이 있는 환자의 경우 해당 병원에 예약할 수 없습니다. 

#### 3. 예약 변경
변경하고자 하는 예약 관련 정보를 받아 기존의 예약을 업데이트 합니다.  
일반 예약과 마찬가지로 중복되는 예약은 생성할 수 없습니다.  


#### 4. No Show 등록
예약번호를 받아 No Show 기록을 등록합니다.  
이미 등록된 정보로는 중복 등록이 불가능합니다. 

#### 5. 예약 가능 시간 확인 
날짜와 병원 정보를 받아 예약 가능한 날짜를 반환합니다. 

## API doc

[API DOCS LINK](https://documenter.getpostman.com/view/23155227/2s847HNCLG)

위 링크에서 각 API에 대한 설명 및 예시를 볼 수 있습니다. 
![image](https://user-images.githubusercontent.com/107532513/196478755-dfa64793-d4ea-4be5-a6d1-ecf9ed65bd2e.png)

Example Request의 드롭박스를 통해 해당 API의 다른 예시를 볼 수 있습니다. 
![image](https://user-images.githubusercontent.com/107532513/196478880-673188e5-8259-4d39-a5eb-1e54484fdd5a.png)
