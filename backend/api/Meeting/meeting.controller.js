import axios from "axios";
import appErrors from "../../utils/appErrors.js";
import asyncWrapper from "../../utils/asyncWrapper.js";
import serializeBody from "../../utils/serializeBody.js";

// Get Zoom Access Token
const getZoomAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://zoom.us/oauth/token",
      {
        grant_type: "account_credentials",
        account_id: process.env.ZOOM_ACCOUNT_ID,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (err) {
    console.error(
      "Error fetching Zoom Access Token:",
      err.response?.data || err.message || err
    );
    throw new appErrors("Failed to retrieve Zoom access token", 500);
  }
};

// Create Zoom Meeting
export const createMeeting = asyncWrapper(async (req, res, next) => {
  const requiredFields = ["email", "topic", "type"];
  const allowFields = ["duration", "schedule_for", "start_time"];
  const filterdData = serializeBody(
    req.body,
    next,
    requiredFields,
    allowFields
  );

  if (!filterdData) return;

  if (filterdData.type === 2 && !filterdData.duration) {
    return next(new appErrors("Duration is required", 400));
  }

  if (filterdData?.agenda?.length > 2000) {
    return next(
      new appErrors("Agenda exceeds the maximum length of 2000 characters", 400)
    );
  }

  if (filterdData?.topic?.length > 200) {
    return next(
      new appErrors("Topic exceeds the maximum length of 200 characters", 400)
    );
  }

  const currentTime = new Date();
  if (
    filterdData?.start_time &&
    new Date(filterdData.start_time) < currentTime
  ) {
    return next(new appErrors("Start time should be in the future", 400));
  }

  try {
    const token = await getZoomAccessToken();

    if (!token) {
      console.error("Zoom token retrieval failed.");
      return next(new appErrors("Failed to retrieve Zoom access token", 500));
    }

    console.log("Retrieved Zoom Token:", token);

    const meetingResponse = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        ...filterdData,
        default_password: false,
        settings: {
          allow_multiple_devices: true,
          alternative_hosts_email_notification: true,
          host_video: true,
          participant_video: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(meetingResponse, "response");
    res.json(meetingResponse.data);
  } catch (error) {
    console.error(
      "Error creating Zoom meeting:",
      error?.response?.data || error
    );
    return next(new appErrors("Failed to create Zoom meeting", 500));
  }
});
