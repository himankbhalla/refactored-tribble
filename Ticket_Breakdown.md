# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
Ticket 1:
1. Write a migration for adding a new custom agent Id column in the Agent table.
    Implementation:
    - write a migration for adding a new column in Agent table
    - Update the corresponding data model in the application layer
    Acceptance Criteria:
    - Agent table should have a new column named custom_agent_id
    Time/effort:
    - Less than 1 story point
Ticket 2:
1. Update the getShiftByFaculty method to return the new custom agent Id along with other metadata.
    Implementation:
    - Update the test cases of getShiftByFaculty method
    - Run the tests for getShiftByFaculty method
    - Fix the getShiftByFaculty implementation by changing the serializer in the getShiftByFaculty method to include the new custom agent id along with other metadata
    - Rerun the testcases, now all should pass
    Acceptance Criteria:
    - getShiftByFaculty method should return agent's new id as well.
    Time/effort:
    - 2 story point
Ticket 3:
1. Update the generateReport method to include the new custom agent Id.
    Implementation
    - Update the test cases of generateReport method
    - Run the tests for getShiftByFaculty method, some/or all of the testcases will fail
    - Fix the getShiftByFaculty implementation by generateReport method to include the new custom agent id along with other metadata
    - Rerun the testcases, now all should pass
    Acceptance Criteria:
    - Final report should have the new custom agent id inplace of agent's database id
    Time/effort:
    - 2 story points
Ticket 4:
1. Update the previously generated reports to include the new agent Id. Needs discussion from PM about which all reports needs to be updated? Does all the faculties require this change or not?
   Implementation
   - Create a job which picks a report based on filter provided by PM and update them to include the new agent Id
   - Store the change logs to the reports
   - Previous report should be archived and hidden from users but accessible by admins
   Acceptance Criteria:
   - The new version of the reports is available to all the required clients
   Time/effort:
   - 3 story points

Delivery Plan

1. Put the application layer changes behind a feature flag.
2. Open the flag for controlled group of users in Alpha test stage
3. If alpha testing is passed then open the flag for 20% users in Beta stage
4. If Beta testing is passed then open the feature flag for the users in production

