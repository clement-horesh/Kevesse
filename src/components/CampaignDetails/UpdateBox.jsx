import React from "react";
import { ButtonWithIcon } from "..";
import Box from "../Box";

const UpdatesBox = ({ updates }) => {
  function hexToDateTime(hexString) {
    const timestamp = parseInt(hexString, 16);
    return new Date(timestamp * 1000);
  }

  function formatDate(date) {
    return (
      date.getDate().toString().padStart(2, "0") +
      "/" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      date.getFullYear().toString().substr(2, 2)
    );
  }

  return (
    <Box title="Updates">
      <div className="h-[160px] flex items-center">
        <div className="bg-[#333334] w-[100%] max-h-[160px] p-[15px] text-[16px] text-[#e1e1e1] rounded-[11px] overflow-hidden">
          {updates.length > 0 ? (
            <div>
              <div className="flex justify-between items-center text-20px">
                <p className="font-bold">
                  {updates[updates.length - 1].title}
                  {new Date() -
                    hexToDateTime(updates[updates.length - 1].timestamp._hex) <
                    7 * 24 * 60 * 60 * 1000 && (
                    <span className="font-bold text-green-500 ml-2">NEW</span>
                  )}
                </p>
                <p className="font-light text-[#676767] text-[14px]">
                  Latest Update:{" "}
                  {formatDate(
                    hexToDateTime(updates[updates.length - 1].timestamp._hex)
                  )}
                </p>
              </div>
              <p className="text-[16px] text-ellipsis overflow-hidden max-h-[100px]">
                Message: {updates[updates.length - 1].message}
              </p>
            </div>
          ) : (
            <p>No updates yet.</p>
          )}
        </div>
      </div>
      <div className="w-[100%] pt-[20px] grid justify-items-center">
        <ButtonWithIcon text="See more" iconType="arrowUpDown" />
      </div>
    </Box>
  );
};

export default UpdatesBox;
