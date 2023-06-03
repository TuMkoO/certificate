# certificate

Certificate - данное приложение представляет из себя CRM систему для организации учета сварщиков, прошедших аттестацию и получивших удостоврение и допуск к работе.

**Использованные технологии:**  
:small_orange_diamond: Vue 3 (Typescript, Vite, Vuex) + Bootstrap 5  
:small_orange_diamond: Node.JS + Express + MongoDb

---

### For development:

1. Install server:

```
npm install
```

2. Install client:

```
npm run client:install
```

### For production:

3. Build client:

```
npm run client:build
```

### Live demo: https://certificate.cyclic.app

Данные для входа в ознакомительную учетную запись:

```
email: test@mail.ru
password: test@mail.ru
```

Возможности ознакомительной учетной записи (клиентской):

- редактирование личных данных
- просмотр статистики по сварщикам
- просмотр удостоверений
- поиск и сортировка удостоверений
- печать удостоверения

Возможности администратора приложения:

- создание/удаление/редактирование пользователей
- создание/удаление/редактирование удостоверений
- создание/удаление/редактирование вкладышей удостоверений ("под- удостоверений")
- печать удостоверений, сохранение в форматах .docx и .pdf
- настройки приложения (системные, тематические)

Доступ в CRM разрешен только авторизованным пользователям (кроме страниц авторизации, политики, удостоверений\*)

\* Страницы удостоверений доступны по уникальным id. В удостоверениях есть QR-код, в котором помимо основной информации (ФИО, срок действия удостоверения) указана ссылка на удостоверение (неавторизованному пользователю доступна краткая информация).
