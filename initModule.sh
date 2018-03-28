#!/bin/bash
sudo yum update
sudo yum install git
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -
sudo yum install yarn
git clone https://github.com/AnonymousBlobfish/map-sidebar.git
cd map-sidebar
yarn install
git pull origin deployed
sudo yarn add webpack
sudo yarn add webpack-cli
yarn webpack
yarn webpack --config webpack.config.server.js
node dist/server/server_bundle.js

