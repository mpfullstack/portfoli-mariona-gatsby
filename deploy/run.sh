# To catch any error in all following commands
trap 'code+=$?' DEBUG
code=0

cd $GATSBY_SRC_CODE_PATH
git pull --all
npm install

if [ ! -d $GATSBY_SRC_APP_PATH ]; then
  mkdir $GATSBY_SRC_APP_PATH
fi

# TODO: Only run tests in development and staging environments

./node_modules/.bin/gatsby clean
./node_modules/.bin/gatsby build

# Remove GATSBY_SRC_CODE_PATH full path from js files
# TODO: Review if necessary
find "$GATSBY_SRC_CODE_PATH/public" -type f -name '*.js' -exec sed -i 's@'"$GATSBY_SRC_CODE_PATH/public"'@''@g' {} \;
find "$GATSBY_SRC_CODE_PATH/public" -type f -name '*.js' -exec sed -i 's@'"$GATSBY_SRC_CODE_PATH"'@''@g' {} \;

current=`date "+%Y%m%d_%s"`
rsync -ah $GATSBY_SRC_CODE_PATH/public/* $GATSBY_SRC_APP_PATH/$current

# Make new symlink
rm $GATSBY_SRC_APP_PATH/current
ln -s $GATSBY_SRC_APP_PATH/$current $GATSBY_SRC_APP_PATH/current

# TODO: Delete old deployments (older than 20 days) in $GATSBY_SRC_APP_PATH NOTE: DO NOT DELETE THE CURRENT DIRECTORY

exit $code