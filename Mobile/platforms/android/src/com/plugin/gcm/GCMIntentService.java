package com.plugin.gcm;

import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.ActivityCompat;
import android.util.Log;
import android.location.LocationManager;
import android.location.Location;
import android.graphics.BitmapFactory;
import 	android.graphics.Bitmap;

import com.google.android.gcm.GCMBaseIntentService;
import com.imageid.mobile.R;

@SuppressLint("NewApi")
public class GCMIntentService extends GCMBaseIntentService {

	private static final String TAG = "IID_Notification_Service";
	
	public GCMIntentService() {
		super("GCMIntentService");
	}

	@Override
	public void onRegistered(Context context, String regId) {

		Log.v(TAG, "onRegistered: "+ regId);

		JSONObject json;

		try
		{
			json = new JSONObject().put("event", "registered");
			json.put("regid", regId);

			Log.v(TAG, "onRegistered: " + json.toString());

			// Send this JSON data to the JavaScript application above EVENT should be set to the msg type
			// In this case this is the registration ID
			PushPlugin.sendJavascript( json );

		}
		catch( JSONException e)
		{
			// No message to the user is sent, JSON failed
			Log.e(TAG, "onRegistered: JSON exception");
		}
	}

	@Override
	public void onUnregistered(Context context, String regId) {
		Log.d(TAG, "onUnregistered - regId: " + regId);
	}

	@Override
	protected void onMessage(Context context, Intent intent) {
		Log.d(TAG, "onMessage - context: " + context);

		// Extract the payload from the message
		Bundle extras = intent.getExtras();
		if (extras != null) {
			for (String key : extras.keySet()) {
				Object value = extras.get(key);
				Log.d(TAG, String.format("Extras -->  %s %s (%s)", key, value.toString(), value.getClass().getName()));
			}

			String strTargetLocation = extras.getString("gcm.notification.location");
			String targetLat = null;
			String targetLng = null;
			try {
				JSONObject jo = new JSONObject(strTargetLocation);
				targetLat = jo.getString("lat");
				targetLng = jo.getString("lng");
				Log.d(TAG, String.format("Target location -->  %s,%s", targetLat, targetLng));
			} catch (Exception e){
				e.printStackTrace();
			}

			// Getting last location: 
			Location lastLocation = null;
			if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED &&
                ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
	            LocationManager lm = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
				lastLocation = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);	
				if (lastLocation == null){
					lastLocation = lm.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
					Log.d(TAG, String.format("Last location -->  %s,%s", lastLocation.getLatitude() + "", lastLocation.getLongitude() + ""));
				}
	        }

			// if we are in the foreground, just surface the payload, else post it to the statusbar
            if (PushPlugin.isInForeground()) {
				extras.putBoolean("foreground", true);
				if(isNear(lastLocation, targetLat, targetLng)) {
	                PushPlugin.sendExtras(extras);
	            }
			} else {
				extras.putBoolean("foreground", false);

				if(isNear(lastLocation, targetLat, targetLng)) {
					createNotification(context, extras);
				}
            }
        }
	}

	private boolean isNear(Location lastLocation, String targetLat, String targetLng){
		if (lastLocation == null) {
			Log.w(TAG, "Can't get last location, I will display the notification anyway");
			return true;
		}

		if (targetLat == null || targetLng == null) {
			Log.w(TAG, "No target location, I will display the notification anyway");
			return true;
		}

		// TODO Check if both locations are near..


		return true;
	}

	public void createNotification(Context context, Bundle extras) {
		String message = extras.getString("gcm.notification.message");
		if (message == null || message.length() < 1) {
			Log.w(TAG, "Notification with empty message, ignoring it...");
            return ;
        }

		NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

		Intent notificationIntent = new Intent(this, PushHandlerActivity.class);
		notificationIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
		notificationIntent.putExtra("pushBundle", extras);

		PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);
		
		int defaults = Notification.DEFAULT_ALL;

		if (extras.getString("defaults") != null) {
			try {
				defaults = Integer.parseInt(extras.getString("defaults"));
			} catch (NumberFormatException e) {}
		}

		NotificationCompat.Builder mBuilder =
			new NotificationCompat.Builder(context)
				.setSmallIcon(R.drawable.notification_small)
				.setContentTitle(context.getString(R.string.app_name))
				.setContentText(message)
				.setContentIntent(contentIntent);

		int notId = 0;
		mNotificationManager.notify(context.getString(R.string.app_name), notId, mBuilder.build());
	}
	
	@Override
	public void onError(Context context, String errorId) {
		Log.e(TAG, "onError - errorId: " + errorId);
	}

}
