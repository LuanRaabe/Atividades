sudo apt update
sudo apt list --upgradable
sudo apt upgrade
sudo apt-get install libpcre3-dev libssl-dev build-essential net-tools wget libgcc libstdc++ vsftpd -y
VERSION=v16.13.1
DISTRO=linux-x64
sudo wget https://nodejs.org/dist/v16.13.1/node-v16.13.1-linux-x64.tar.xz
sudo mkdir -p /usr/local/lib/nodejs
sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs
export PATH=/usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin:$PATH
. ~/.profile
node -v
npm version
npx -v
sudo ln -s /usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin/node /usr/bin/node
sudo ln -s /usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin/npm /usr/bin/npm
sudo ln -s /usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin/npx /usr/bin/npx
cd /usr/local/lib/nodejs/node-$VERSION-$DISTRO
sudo mkdir html
cd html
sudo nano index.html
ESCREVA SEU HTML >> ctrl X >> Y >> enter
sudo nano app.js

ESCREVA:

var fs = require('fs'),
    http = require('http');

http.createServer(function (req, res) {
  fs.readFile(__dirname + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080);

FIMESCREVA >> ctrl X >> Y >> enter

sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.orig
sudo ufw enable
sudo ufw allow 20/tcp
sudo ufw allow 21/tcp
sudo ufw allow 80/tcp
sudo ufw allow 8080/tcp
sudo ufw allow 990/tcp
sudo ufw allow 40000:50000/tcp
sudo ufw reload
sudo chown nobody:nogroup /usr/local/lib/nodejs/node-$VERSION-$DISTRO/html
sudo chown luanraabe:luanraabe /usr/local/lib/nodejs/node-$VERSION-$DISTRO/html/pages
echo "vsftpd test file" | sudo tee /usr/local/lib/nodejs/node-$VERSION-$DISTRO/html/pages/test.txt
sudo chmod 777 /etc/vsftpd.conf
echo -e "write_enable=YES\n
chroot_local_user=YES\n
\n
user_sub_token=$USER\n
local_root=/usr/local/lib/nodejs/node-$VERSION-$DISTRO/html/pages\n
pasv_min_port=40000\n
pasv_max_port=50000\n
userlist_enable=YES\n
userlist_file=/etc/vsftpd.userlist\n
userlist_deny=NO">>/etc/vsftpd.conf
sudo echo "luanraabe" | sudo tee -a /etc/vsftpd.userlist
sudo systemctl restart vsftpd

sudo node app.js;