sudo apt update
sudo apt list --upgradable
sudo apt upgrade
sudo apt-get install build-essential net-tools -y
sudo apt-get install libpcre3-dev libssl-dev zlib1g-dev -y
cd /opt
sudo wget http://nginx.org/download/nginx-1.20.2.tar.gz
sudo tar -zxf nginx-1.20.2.tar.gz
cd nginx-1.20.2
sudo ./configure --prefix=/web/nginx --modules-path=/web/nginx/modules --with-http_ssl_module
sudo make
sudo make install
cd /bin
sudo ln -s /web/nginx/sbin/nginx nginx
sudo nginx -v && nginx -V
echo "[Unit]\n
Description=The NGINX HTTP and reverse proxy server\n
After=syslog.target network-online.target remote-fs.target nss-lookup.target\n
Wants=network-online.target\n
\n
[Service]\n
Type=forking\n
PIDFile=/web/nginx/logs/nginx.pid\n
ExecStartPre=/web/nginx/sbin/nginx -t\n
ExecStart=/web/nginx/sbin/nginx\n
ExecReload=/web/nginx/sbin/nginx -s reload\n
ExecStop=/bin/kill -s QUIT $MAINPID\n
PrivateTmp=true\n
\n
[Install]\n
WantedBy=multi-user.target">>/etc/systemd/system/nginx.service
sudo apt install vsftpd
sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.orig
sudo ufw enable
sudo ufw allow 20/tcp
sudo ufw allow 21/tcp
sudo ufw allow 990/tcp
sudo ufw allow 40000:50000/tcp
sudo ufw reload
sudo mkdir /web/nginx/html/pages
sudo chown nobody:nogroup /web/nginx/html
sudo chown luanraabe:luanraabe /web/nginx/html/pages
echo "vsftpd test file" | sudo tee /web/nginx/html/pages/test.txt
echo "write_enable=YES\n
chroot_local_user=YES\n
\n
user_sub_token=$USER\n
local_root=/web/nginx/html/pages\n
pasv_min_port=40000\n
pasv_max_port=50000\n
userlist_enable=YES\n
userlist_file=/etc/vsftpd.userlist\n
userlist_deny=NO">>/etc/vsftpd.conf
sudo echo "luanraabe" | sudo tee -a /etc/vsftpd.userlist
sudo systemctl restart vsftpd
sudo service nginx restart
