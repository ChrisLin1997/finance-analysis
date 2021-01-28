from datetime import datetime, date

#api
CORS = 'https://cors-anywhere.herokuapp.com/'
NewsApiKey = '00942a082b944507982c1e8c2cbba299'

# limit
newsLength = 50

# time
today = date.today()
year = int(today.strftime('%Y'))
month = int(today.strftime('%m'))
ROCyear = year - 1911