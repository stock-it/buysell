Transactional component for handling stock buys/sells

#CRUD API Routes

HTTP GET -> /stocks/:ticker  -	Initial Page Load

HTTP GET -> /api/stocks/:ticker - Display Company API Data

HTTP GET -> /api/accounts/:account_number - Display Account API 

HTTP PUT -> /accounts/:account_number - Update Purchase/Sell stock

HTTP POST/PUT/DELETE -> /stocks/:ticker/dev	- Admin changes to listed companies

HTTP POST/PUT/DELETE -> /accounts/:account_number/dev	Admin changes to user account
