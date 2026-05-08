Notification System Design

Stage 1: Priority Inbox Implementation

Approach:

The Priority Inbox is designed to display the top 10 most important unread notifications based on a combination of priority weight and recency.

Priority Determination
- Weight Assignment:
  - Placement: 3 (highest priority)
  - Result: 2
  - Event: 1 (lowest priority)
- Recency: Newer notifications (based on timestamp) are prioritized over older ones within the same weight category.

 Sorting Algorithm
1. Assign a weight to each notification based on its type.
2. Parse the timestamp into a Date object for comparison.
3. Sort the notifications:
   - First by weight in descending order (higher weight first).
   - Then by timestamp in descending order (newer first).
4. Select the top 10 notifications.

Implementation Details:
Language: JavaScript (React)
Data Fetching: Use the provided API endpoint to fetch notifications.
Periodic Updates: Fetch notifications every 30 seconds to handle incoming notifications.
UI: Simple list display with vanilla CSS styling.

Maintaining Top 10 Efficiently:
Since the number of notifications is expected to be manageable (not millions), we can afford to fetch all notifications and sort them each time. For efficiency:
 Use a stable sort algorithm (JavaScript's Array.sort is stable).
 Limit to top 10 after sorting.
 In a production system with large volumes, we could use a priority queue (e.g., heap) to maintain the top N in O(log N) time per insertion, but for this implementation, sorting is sufficient.

Assumptions:
- The API returns all notifications; we don't implement pagination.
- Authentication for the protected API is handled externally (not implemented here).
- Notifications are considered "unread" as per the API response.

Code Structure:
- `App.jsx`: Main component that fetches, sorts, and displays notifications.
- `App.css`: Styles for the notification list.

Future Enhancements
- Implement authentication for the API.
- Add user preference for 'n' (top 10, 15, etc.).
- Optimize for large notification volumes using data structures like heaps.
- Add real-time updates via WebSockets instead of polling.</content>
<parameter name="filePath">c:\Users\kavya\OneDrive\Desktop\afform\front\Notification_System_Design.md