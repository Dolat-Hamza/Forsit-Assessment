#!/bin/bash

zip -r ecommerce-admin-dashboard.zip . -x "node_modules/*" "node_modules/**/*" ".git/*" ".git/**/*"

echo "Created ecommerce-admin-dashboard.zip"
