Feature: Tuner

  As an user of the app
  I want to tune my instrument
  So that I can play the correct notes

Scenario: Record and Display the Tuned Note
  Given the user has opened the Tuner app
  When the user starts recording through the phone's microphone
  When the user plays the "D♯" note "perfectly tuned"
  Then the app should detect the note
  Then display the correct "D♯" note name
  Then show the note as "In Tune"

Scenario: Record and Display Slightly Sharp Note
  Given the user has opened the Tuner app
  When the user starts recording through the phone's microphone
  When the user plays the "B" note "slightly sharp"
  Then the app should detect the note
  Then display the correct "B" note name
  Then show the note as "Slightly Sharp"
  
Scenario: Record and Display Slightly Flat Note
  Given the user has opened the Tuner app
  When the user starts recording through the phone's microphone
  When the user plays the "C" note "slightly flat"
  Then the app should detect the note
  Then display the correct "C" note name
  Then show the note as "Slightly Flat"

Scenario: Record and Display Sharp Note
  Given the user has opened the Tuner app
  When the user starts recording through the phone's microphone
  When the user plays the "A" note "significantly sharp"
  Then the app should detect the note
  Then display the correct "A" note name
  Then show the note as "Sharp"

Scenario: Record and Display Flat Note
  Given the user has opened the Tuner app
  When the user starts recording through the phone's microphone
  When the user plays the "G" note "significantly flat"
  Then the app should detect the note
  Then display the correct "G" note name
  Then show the note as "Flat"

Scenario: Handle Invalid Input
  Given the user has opened the Tuner app
  When the user starts recording through the phone's microphone
  When plays a sound that is not a recognizable musical note
  Then the app should not display any note name
  Then show the note as "No Note Detected"

Scenario: Responsiveness
  Given the user has opened the Tuner app
  When the user starts recording through the phone's microphone
  When the user plays the "C♯" note "perfectly tuned"
  Then the app should detect the note
  Then display the correct "C♯" note name
  Then the app's response time should be within an acceptable range


