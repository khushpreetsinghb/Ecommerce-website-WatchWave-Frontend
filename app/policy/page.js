import React from "react";

export const metadata = {
  title: "Privacy Policy - WatchWave",
};

const Policy = () => {
  return (
    <div className="row contactus ">
      <div className="col-md-6 ">
        <img
          src="/images/contactus.jpeg"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et turpis ultricies, vulputate enim in, feugiat enim. Sed hendrerit feugiat nibh, ut ornare purus posuere vitae. Morbi id scelerisque nulla. Nullam volutpat in nisi eu volutpat. Nunc convallis, tortor vitae venenatis auctor, dui elit mattis orci, vitae convallis dui odio vitae ipsum.</p>
      </div>
    </div>
  );
};

export default Policy;
