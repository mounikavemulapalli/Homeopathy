/** @format */

import React from "react";

const getValue = (val) =>
  val !== undefined && val !== "" && val !== null ? val : "NA";

const CaseDetailsTable = ({ data }) => {
  return (
    <div className='case-table'>
      <table
        border='1'
        cellPadding='10'
        style={{ borderCollapse: "collapse", marginBottom: "20px" }}
      >
        <tbody>
          <tr>
            <td>
              <b>Name</b>
            </td>
            <td>{getValue(data.name)}</td>
          </tr>
          <tr>
            <td>
              <b>Age</b>
            </td>
            <td>{getValue(data.age)}</td>
          </tr>
          <tr>
            <td>
              <b>Gender</b>
            </td>
            <td>{getValue(data.gender)}</td>
          </tr>
          <tr>
            <td>
              <b>Marital Status</b>
            </td>
            <td>{getValue(data.maritalStatus)}</td>
          </tr>
          <tr>
            <td>
              <b>Occupation</b>
            </td>
            <td>{getValue(data.occupation)}</td>
          </tr>
          <tr>
            <td>
              <b>Address</b>
            </td>
            <td>{getValue(data.address)}</td>
          </tr>
          <tr>
            <td>
              <b>Phone</b>
            </td>
            <td>{getValue(data.phone)}</td>
          </tr>
          <tr>
            <td>
              <b>Date of Visit</b>
            </td>
            <td>{new Date(data.dateOfVisit).toLocaleDateString() || "NA"}</td>
          </tr>

          <tr>
            <td>
              <b>Chief Complaints</b>
            </td>
            <td>
              {data.chiefComplaints?.length ? (
                <ul>
                  {data.chiefComplaints.map((c, i) => (
                    <li key={i}>
                      <b>Complaint:</b> {getValue(c.complaint)} |{" "}
                      <b>Duration:</b> {getValue(c.duration)} |{" "}
                      <b>Description:</b> {getValue(c.description)}
                    </li>
                  ))}
                </ul>
              ) : (
                "NA"
              )}
            </td>
          </tr>

          <tr>
            <td>
              <b>History of Present Illness</b>
            </td>
            <td>{getValue(data.historyPresentIllness)}</td>
          </tr>

          <tr>
            <td>
              <b>Past History</b>
            </td>
            <td>
              <b>Childhood Diseases:</b>{" "}
              {getValue(data.pastHistory?.childhoodDiseases)} <br />
              <b>Surgeries/Injuries:</b>{" "}
              {getValue(data.pastHistory?.surgeriesInjuries)} <br />
              <b>Major Illnesses:</b>{" "}
              {getValue(data.pastHistory?.majorIllnesses)}
            </td>
          </tr>

          <tr>
            <td>
              <b>Family History</b>
            </td>
            <td>{getValue(data.familyHistory)}</td>
          </tr>

          <tr>
            <td>
              <b>Personal History</b>
            </td>
            <td>
              <b>Appetite:</b> {getValue(data.personalHistory?.appetite)} <br />
              <b>Cravings/Aversions:</b>{" "}
              {getValue(data.personalHistory?.cravingsAversions)} <br />
              <b>Thirst:</b> {getValue(data.personalHistory?.thirst)} <br />
              <b>Bowel:</b> {getValue(data.personalHistory?.bowel)} <br />
              <b>Urine:</b> {getValue(data.personalHistory?.urine)} <br />
              <b>Sleep:</b> {getValue(data.personalHistory?.sleep)} <br />
              <b>Dreams:</b> {getValue(data.personalHistory?.dreams)} <br />
              <b>Sweat:</b> {getValue(data.personalHistory?.sweat)} <br />
              <b>Thermal:</b> {getValue(data.personalHistory?.thermal)} <br />
              <b>Habits:</b> {getValue(data.personalHistory?.habits)} <br />
              <b>Menstrual:</b> {getValue(data.personalHistory?.menstrual)}
            </td>
          </tr>

          <tr>
            <td>
              <b>Mental Symptoms</b>
            </td>
            <td>{getValue(data.mentalSymptoms)}</td>
          </tr>
          <tr>
            <td>
              <b>General Remarks</b>
            </td>
            <td>{getValue(data.generalRemarks)}</td>
          </tr>
          <tr>
            <td>
              <b>Observations By Doctor</b>
            </td>
            <td>{getValue(data.observationsByDoctor)}</td>
          </tr>

          <tr>
            <td>
              <b>Prescription</b>
            </td>
            <td>
              {data.prescription?.length ? (
                <ul>
                  {data.prescription.map((p, i) => (
                    <li key={i}>
                      <b>Date:</b>{" "}
                      {new Date(p.date).toLocaleDateString() || "NA"} |{" "}
                      <b>Remedy:</b> {getValue(p.remedyName)} | <b>Potency:</b>{" "}
                      {getValue(p.potency)} | <b>Dose:</b> {getValue(p.dose)} |{" "}
                      <b>Instructions:</b> {getValue(p.instructions)}
                    </li>
                  ))}
                </ul>
              ) : (
                "NA"
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CaseDetailsTable;
