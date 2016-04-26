

cordova plugin rm cordova-plugin-console;
ionic build android;
cordova build --release android;
cp ./platforms/android/build/outputs/apk/android-release-unsigned.apk ./iid-unsigned.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../../../Backups/iid.keystore ./iid-unsigned.apk IID
$ANDROID_HOME/build-tools/23.0.3/zipalign -v 4 ./iid-unsigned.apk ~/Desktop/iid-signed.apk
rm ./iid-unsigned.apk