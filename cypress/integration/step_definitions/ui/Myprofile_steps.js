import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";
import  MyProfile  from "../../../support/pageObjects/MyProfilePage";

Then("My Profile page should be displayed correctly", () => {
  new  MyProfile().validateMyProfilePageDetails();
});

Then(
  "Username should be displayed correctly under profile gravator in MyProfileTab",
  (datatable) => {
    datatable.hashes().forEach((row) => {
      new  MyProfile().verifyUserNamenProfileGravator(row.Username);
    });
  }
);

And("User should have logout button enabled for MyProfileTab", () => {
  new  MyProfile().verifyLogoutButton();
});

And("Sidebar menu should be displayed correctly for MyProfileTab", () => {
  new MyProfile().verifySideMenuLinks();
});

And(
  "User data should be auto-populated correctly in profile for MyProfileTab",
  () => {
    new  MyProfile().verifyAutoPopulatedDataMyProfile();
  }
);

And(
  "All fields in profile should be displayed correctly for MyProfileTab",
  () => {
    new  MyProfile().verifyFieldsMyProfile();
  }
);

And("User updates profile details", (datatable) => {
  datatable.hashes().forEach((row) => {
    new MyProfile().updateProfileDetails(
      row.firstName,
      row.lastName,
      row.displayName,
      row.AboutMe
    );
  });
});

Then("User saves the details", () => {
  new MyProfile().saveDetails();
});

And("Verify success message is displayed correctly", () => {
  new MyProfile().verifySuccessMessage();
});

And("Clicks on Toogle button to Hide or UnHide my gravator", () => {
  new  MyProfile().clickToggleInputButton();
});

Then("No sites should be displayed under Profile Links", () => {
  new  MyProfile().verifyNoProfileLinksStatus();
});

And("User adds {string} in Profile Links", (profilelink) => {
  new  MyProfile().addProfileLinks(profilelink);
});

Then("Site should be added successfully", () => {
  new  MyProfile().verifySiteAddedSuccessMessage();
});

When("User deletes the added site", () => {
  new  MyProfile().deleteAddedSite();
});

Then("Site should be deleted successfully", () => {
  new  MyProfile().verifySiteDeletedMessage();
});

When("User updated the details back to original data", () => {
  new  MyProfile().updateSiteDetailsBack();
});
