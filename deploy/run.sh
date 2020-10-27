cd $SRC_CODE/site
git pull --all
npm install

# TODO: Only run tests in development and staging environments

gatsby clean
gatsby build

# Remove SRC_CODE full path from js files
find "$SRC_CODE/site/public" -type f -name '*.js' -exec sed -i 's@'"$SRC_CODE/site/public"'@''@g' {} \;
find "$SRC_CODE/site/public" -type f -name '*.js' -exec sed -i 's@'"$SRC_CODE/site"'@''@g' {} \;

current=`date "+%Y%m%d_%s"`
rsync -ah $SRC_CODE/site/public/* $SRC_APP/site/$current

# Make new symlink
rm $SRC_APP/site/current
ln -s $SRC_APP/site/$current $SRC_APP/site/current
