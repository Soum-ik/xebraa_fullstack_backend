sudo su
git stash
git fetch origin Prod_main
git reset --hard origin/Prod_main


# Install dependencies
npm install -f

# Build the application (if applicable)
npm run build

# Ensure pm2 is installed
if ! command -v pm2 &> /dev/null
then
    echo "pm2 could not be found, installing..."
    sudo npm install -g pm2
fi

# Restart the application using pm2
APP_NAME="pre-launching-landing-page"

# Check if the app is already running
if pm2 list | grep -q $APP_NAME; then
    pm2 stop $APP_NAME
    pm2 delete $APP_NAME
fi
PORT=3040 pm2 start npm --name $APP_NAME -- run start

# Save the pm2 process list and respective environments
pm2 save

# Print the status of all pm2 processes
pm2 status

# Restart Nginx to apply any configuration changes
sudo systemctl restart nginx

echo "Deployment of $APP_NAME completed successfully!"
