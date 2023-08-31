# shortener-server
# always start the server with: SESSION_SECRET=tENPRONpN9fwsdweX1pVJrquzlU4LdKM npm start
# dummy saved user: user1 // password1
# login needs to be sent the corresponding cookies to start a session: 

using CURL: 
- save the cookie when log in: curl -c cookie.txt -X POST -H "Content-Type: application/json" -d '{"username": "user1", "password": "password1"}' http://localhost:3001/user/login
- use the saved cookie when incremenet / decrement: 
curl -b cookie.txt http://localhost:3001/counter/increment



some mongo commands:
- start server: mongo
- choose table: use linkShortener
- db.find.users().pretty()