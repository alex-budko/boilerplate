curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

cd /path/to/codebase
npm install

npm run build

cd /path/to/backend
npm start

cd /path/to/codebase
npm start

http://localhost:3000
