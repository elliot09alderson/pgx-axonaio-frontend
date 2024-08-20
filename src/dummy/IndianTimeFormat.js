// Set the Indian Timezone
const timeZoneOffset = 330; // Indian Timezone Offset in minutes
const timeZoneOffsetInMs = timeZoneOffset * 60 * 1000; // Indian Timezone Offset in milliseconds

// Set the number of hours or days
const time = 24;

// Create a new date object and set the hours or days with Indian Timezone Offset
const date = new Date(Date.now() + (time * 60 * 60 * 1000) + timeZoneOffsetInMs);

// Format the date as ISO 8601 with Indian Timezone Offset
const isoDate = date.toISOString().slice(0, 19) + "+05:30";

// Store the date in MongoDB
const doc = { date: new Date(isoDate) };
