## Zoho Calendar

### Obtaining Zoho Calendar Client ID and Secret

1. Open [Zoho API Console](https://api-console.zoho.com/) and sign into your account, or create a new one.
2. Create a "Server-based Applications", set the Redirect URL for OAuth `<Timely URL>/api/integrations/zohocalendar/callback` replacing Timely URL with the URI at which your application runs.
3. Fill in any information you want in the "Client Details" tab
4. Go to tab "Client Secret" tab.
5. Now copy the Client ID and Client Secret into your app keys in the Timely admin panel (`<Timely>/settings/admin/apps`).
6. Back in Zoho API Console,
7. In the "Settings" section check the "Multi-DC" option if you wish to use the same OAuth credentials for all data centers.
8. Click the "Save"/ "UPDATE" button at the bottom footer.
9. You're good to go. Now you can easily add your Zoho Calendar integration in the Timely settings at `/settings/my-account/calendars`.
10. You can access your Zoho calendar at [https://calendar.zoho.com/](https://calendar.zoho.com/)

NOTE: If you use multiple calendars with Cal, make sure you enable the toggle to prevent double-bookings across calendar. This is in `/settings/my-account/calendars`.
