import React from "react";

const getSleepStatus = (questionId: any, scoreValue: any) => {
  if (parseInt(questionId) === 47) {
    switch (true) {
      case parseInt(scoreValue) > 85:
        return "No Difficulty";
      case parseInt(scoreValue) >= 75 && parseInt(scoreValue) <= 84:
        return "Mild Difficulty";
      case parseInt(scoreValue) >= 65 && parseInt(scoreValue) <= 74:
        return "Moderate Difficulty";
      case parseInt(scoreValue) < 65:
        return "Severe Difficulty";
      default:
        return "";
    }
  } else {
    switch (scoreValue) {
      case "0":
        return "No Difficulty";
      case "1":
        return "Mild Difficulty";
      case "2":
        return "Moderate Difficulty";
      case "3":
        return "Severe Difficulty";
      default:
        return "";
    }
  }
};

const getBMIstatus = (questionId: any, scoreValue: any) => {
  if (questionId === 22) {
    return "cm";
  } else if (questionId === 23) {
    return "kg";
  } else if (questionId === 24) {
    const tempGender = localStorage.getItem("currentPatientGender");

    if (tempGender == "male") {
      switch (true) {
        case parseInt(scoreValue) >= 0.95:
          return "- At Risk";
        case parseInt(scoreValue) > 0.9 && parseInt(scoreValue) < 0.95:
          return "- Average";
        case parseInt(scoreValue) > 0.85 && parseInt(scoreValue) < 0.9:
          return "- Good";
        case parseInt(scoreValue) <= 0.85:
          return "- Excellent";
        default:
          return "";
      }
    } else if (tempGender == "female") {
      switch (true) {
        case parseInt(scoreValue) >= 0.86:
          return "- At Risk";
        case parseInt(scoreValue) > 0.8 && parseInt(scoreValue) < 0.86:
          return "- Average";
        case parseInt(scoreValue) > 0.75 && parseInt(scoreValue) < 0.8:
          return "- Good";
        case parseInt(scoreValue) <= 0.75:
          return "- Excellent";
        default:
          return "";
      }
    }
  } else {
    return "";
  }
};

const getTobaccoStatus = (questionId: any, scoreValue: any) => {
  if (questionId === 39) {
    switch (true) {
      case parseFloat(scoreValue) == 0:
        return "- No risk";
      case parseFloat(scoreValue) <= 1:
        return "- Low risk";
      case parseFloat(scoreValue) >= 2.0 && parseFloat(scoreValue) <= 5.0:
        return "- Moderate risk";
      case parseInt(scoreValue) > 5.0:
        return "- Severe risk";
      default:
        return "";
    }
  } else {
    return "";
  }
};

const ReportContent = ({
  reportModalCategories,
  allScore,
  stressAnswer,
}: {
  reportModalCategories: any;
  allScore: any;
  stressAnswer: any;
}) => {
  const Section = ({
    title,
    ids,
    startIndex,
    sectionIndex,
    subcategories,
  }: any) => (
    <div className="pastReport_AccCont_div2" style={{ marginTop: "10px" }}>
      <span>{`${sectionIndex}. ${title}`}</span>
      {subcategories
        .filter((subCategory_03: any) =>
          ids.includes(subCategory_03.refQCategoryId)
        )
        .map((subCategory_03: any, subIndex_03: any) => (
          <div
            className="pastReport_AccCont_div2_list"
            key={subCategory_03.refQCategoryId}
          >
            <span style={{ paddingLeft: "1rem" }}>
              {`${sectionIndex}.${subIndex_03 - startIndex} ${
                subCategory_03.refCategoryLabel
              }`}
            </span>
            <div
              className="pastReport_AccCont_div2_sublist"
              style={{ paddingLeft: "2rem" }}
            >
              <span>
                {allScore.find(
                  (item: any) =>
                    item.refQCategoryId.toString() ===
                    subCategory_03.refQCategoryId.toString()
                )?.refPTScore || "N/A"}
              </span>
            </div>
          </div>
        ))}
      <div style={{ width: "100%", borderBottom: "1px solid lightgrey" }}></div>
    </div>
  );

  if (reportModalCategories?.refQCategoryId === 8) {
    return (
      <div
        className="pastReport_AccCont_div2"
        key={reportModalCategories.refQCategoryId}
      >
        {reportModalCategories?.subcategories?.map(
          (subCategory_03: any, subIndex_03: any) => (
            <React.Fragment key={subCategory_03.refQCategoryId}>
              <div className="pastReport_AccCont_div2_list">
                {subCategory_03?.subcategories?.length > 0 ? (
                  <>
                    <span>{`${subIndex_03 + 1}. ${
                      subCategory_03.refCategoryLabel
                    }`}</span>
                    <div>
                      {subCategory_03?.subcategories?.map(
                        (subCategory_04: any) => (
                          <div
                            className="pastReport_AccCont_div2_sublist"
                            key={subCategory_04.refQCategoryId}
                          >
                            <span>{subCategory_04.refCategoryLabel}</span>
                            <span>
                              {
                                allScore.find(
                                  (item: any) =>
                                    item.refQCategoryId ==
                                    subCategory_04.refQCategoryId
                                )?.refPTScore
                              }{" "}
                              mins
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{`${subIndex_03 + 1}. ${
                      subCategory_03.refCategoryLabel
                    }`}</span>
                    {subCategory_03.refQCategoryId == 21 ? (
                      (() => {
                        const scoreString = allScore.find(
                          (item: any) =>
                            item.refQCategoryId == subCategory_03.refQCategoryId
                        )?.refPTScore;

                        if (scoreString) {
                          const [hours, minutes] = scoreString
                            .split(":")
                            .map(Number);
                          if (!isNaN(hours) && !isNaN(minutes)) {
                            return <span>{`${hours} hrs ${minutes} min`}</span>;
                          }
                        }

                        return <span>{scoreString ?? "No score"}</span>;
                      })()
                    ) : (
                      <span>
                        {
                          allScore.find(
                            (item: any) =>
                              item.refQCategoryId ==
                              subCategory_03.refQCategoryId
                          )?.refPTScore
                        }
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div
                style={{ width: "100%", borderBottom: "1px solid lightgrey" }}
              ></div>
            </React.Fragment>
          )
        )}
      </div>
    );
  } else if (reportModalCategories?.refQCategoryId === 9) {
    return (
      <div className="pastReport_AccCont_div2">
        {reportModalCategories?.subcategories.map(
          (subCategory_03: any, subIndex_03: any) => (
            <>
              <div
                className="pastReport_AccCont_div2_list"
                key={subCategory_03.refQCategoryId}
              >
                <span>{`${subIndex_03 + 1}. ${
                  subCategory_03.refCategoryLabel
                }`}</span>

                <div
                  className="pastReport_AccCont_div2_sublist"
                  style={{ flexDirection: "column" }}
                >
                  {(
                    allScore.find(
                      (item: { refQCategoryId: string }) =>
                        item.refQCategoryId ===
                        subCategory_03.refQCategoryId.toString()
                    )?.refPTScore || ""
                  )
                    .split(",")
                    .map(
                      (id: string) =>
                        stressAnswer.find(
                          (answer: {
                            refOptionId: number;
                            refOptionLabel: string;
                          }) => answer.refOptionId == Number(id)
                        )?.refOptionLabel || ""
                    )
                    .filter((label: string) => label) // Filter out any empty labels
                    .map((label: string, index: number) => (
                      <div key={index}>{label}</div>
                    ))}
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid lightgrey",
                }}
              ></div>
            </>
          )
        )}
      </div>
    );
  } else if (reportModalCategories?.refQCategoryId === 10) {
    <div className="pastReport_AccCont_div2">
      {reportModalCategories?.subcategories.map(
        (subCategory_03: any, subIndex_03: any) => (
          <>
            <div
              className="pastReport_AccCont_div2_list"
              key={subCategory_03.refQCategoryId}
            >
              <span>{`${subIndex_03 + 1}. ${
                subCategory_03.refCategoryLabel
              }`}</span>
              {subCategory_03.subcategories.length > 0 ? (
                <div>
                  {subCategory_03?.subcategories.map(
                    (subCategory_04: any, subIndex_04: any) => (
                      <div
                        className="pastReport_AccCont_div2_sublist"
                        key={subCategory_04.refQCategoryId}
                      >
                        <span>{subCategory_04.refCategoryLabel}</span>
                        <span>
                          {
                            allScore.find(
                              (item: any) =>
                                item.refQCategoryId ==
                                subCategory_04.refQCategoryId
                            )?.refPTScore
                          }
                        </span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="pastReport_AccCont_div2_sublist">
                  <span>
                    {
                      allScore.find(
                        (item: any) =>
                          item.refQCategoryId == subCategory_03.refQCategoryId
                      )?.refPTScore
                    }{" "}
                    {subCategory_03.refQCategoryId === 39 ? "PY" : ""}{" "}
                    {getTobaccoStatus(
                      subCategory_03.refQCategoryId,
                      allScore.find(
                        (item: any) =>
                          item.refQCategoryId == subCategory_03.refQCategoryId
                      )?.refPTScore
                    )}
                  </span>
                </div>
              )}
            </div>
            <div
              style={{
                width: "100%",
                borderBottom: "1px solid lightgrey",
              }}
            ></div>
          </>
        )
      )}
    </div>;
  } else if (reportModalCategories?.refQCategoryId === 12) {
    return (
      <>
        <Section
          title="Snack-Refresher-Starters"
          ids={[66, 67, 68, 69]}
          startIndex={-1}
          sectionIndex={1}
          subcategories={reportModalCategories?.subcategories}
        />
        <Section
          title="Meal Composition"
          ids={[70, 71, 72, 73]}
          startIndex={-1}
          sectionIndex={2}
          subcategories={reportModalCategories?.subcategories}
        />
        <Section
          title="Oil Intake"
          ids={[74, 75]}
          startIndex={-1}
          sectionIndex={3}
          subcategories={reportModalCategories?.subcategories}
        />
        <Section
          title="Salt Intake"
          ids={[76, 77]}
          startIndex={-1}
          sectionIndex={4}
          subcategories={reportModalCategories?.subcategories}
        />
        <Section
          title="Dairy Products"
          ids={[78]}
          startIndex={-1}
          sectionIndex={5}
          subcategories={reportModalCategories?.subcategories}
        />
        <Section
          title="Meal Timing"
          ids={[79, 80]}
          startIndex={-1}
          sectionIndex={6}
          subcategories={reportModalCategories?.subcategories}
        />
        <Section
          title="Meal Practices"
          ids={[81, 82, 83]}
          startIndex={-1}
          sectionIndex={7}
          subcategories={reportModalCategories?.subcategories}
        />
      </>
    );
  } else if (reportModalCategories?.refQCategoryId === 13) {
    return (
      <div className="pastReport_AccCont_div2">
        {reportModalCategories?.subcategories.map(
          (subCategory_03: any, subIndex_03: any) => (
            <>
              <div
                className="pastReport_AccCont_div2_list"
                key={subCategory_03.refQCategoryId}
              >
                <span>{`${subIndex_03 + 1}. ${
                  subCategory_03.refCategoryLabel
                }`}</span>
                {subCategory_03.subcategories.length > 0 ? (
                  <div>
                    {subCategory_03?.subcategories.map(
                      (subCategory_04: any, subIndex_04: any) => (
                        <div
                          className="pastReport_AccCont_div2_sublist"
                          key={subCategory_04.refQCategoryId}
                        >
                          <span>{subCategory_04.refCategoryLabel}</span>
                          <span>
                            {
                              allScore.find(
                                (item: any) =>
                                  item.refQCategoryId ==
                                  subCategory_04.refQCategoryId
                              )?.refPTScore
                            }
                          </span>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="pastReport_AccCont_div2_sublist">
                    <span>
                      {allScore.find(
                        (item: any) =>
                          item.refQCategoryId == subCategory_03.refQCategoryId
                      )?.refPTScore +
                        " " +
                        getBMIstatus(
                          subCategory_03.refQCategoryId,
                          allScore.find(
                            (item: any) =>
                              item.refQCategoryId ==
                              subCategory_03.refQCategoryId
                          )?.refPTScore
                        )}
                    </span>
                  </div>
                )}
              </div>
              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid lightgrey",
                }}
              ></div>
            </>
          )
        )}
      </div>
    );
  } else if (reportModalCategories?.refQCategoryId === 43) {
    return (
      <div className="pastReport_AccCont_div2">
        {reportModalCategories?.subcategories.map(
          (subCategory_03: any, subIndex_03: any) => (
            <>
              <div
                className="pastReport_AccCont_div2_list"
                key={subCategory_03.refQCategoryId}
              >
                <span>{`${subIndex_03 + 1}. ${
                  subCategory_03.refCategoryLabel
                }`}</span>
                {subCategory_03.subcategories.length > 0 ? (
                  <div>
                    {subCategory_03?.subcategories.map(
                      (subCategory_04: any, subIndex_04: any) => (
                        <div
                          className="pastReport_AccCont_div2_sublist"
                          key={subCategory_04.refQCategoryId}
                        >
                          <span>{subCategory_04.refCategoryLabel}</span>
                          <span>
                            {
                              allScore.find(
                                (item: any) =>
                                  item.refQCategoryId ==
                                  subCategory_04.refQCategoryId
                              )?.refPTScore
                            }
                          </span>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="pastReport_AccCont_div2_sublist">
                    {subCategory_03.refQCategoryId == 47 ? (
                      <span>
                        {allScore.find(
                          (item: any) =>
                            item.refQCategoryId == subCategory_03.refQCategoryId
                        )?.refPTScore +
                          "%" +
                          " - " +
                          getSleepStatus(
                            subCategory_03.refQCategoryId,
                            allScore.find(
                              (item: any) =>
                                item.refQCategoryId ==
                                subCategory_03.refQCategoryId
                            )?.refPTScore
                          )}
                      </span>
                    ) : (
                      <span>
                        {allScore.find(
                          (item: any) =>
                            item.refQCategoryId == subCategory_03.refQCategoryId
                        )?.refPTScore +
                          " - " +
                          getSleepStatus(
                            subCategory_03.refQCategoryId,
                            allScore.find(
                              (item: any) =>
                                item.refQCategoryId ==
                                subCategory_03.refQCategoryId
                            )?.refPTScore
                          )}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid lightgrey",
                }}
              ></div>
            </>
          )
        )}
      </div>
    );
  }
  {
    return (
      <div className="pastReport_AccCont_div2">
        {reportModalCategories?.subcategories.map(
          (subCategory_03: any, subIndex_03: any) => (
            <>
              <div
                className="pastReport_AccCont_div2_list"
                key={subCategory_03.refQCategoryId}
              >
                <span>{`${subIndex_03 + 1}. ${
                  subCategory_03.refCategoryLabel
                }`}</span>
                {subCategory_03.subcategories.length > 0 ? (
                  <div>
                    {subCategory_03?.subcategories.map(
                      (subCategory_04: any, subIndex_04: any) => (
                        <div
                          className="pastReport_AccCont_div2_sublist"
                          key={subCategory_04.refQCategoryId}
                        >
                          <span>{subCategory_04.refCategoryLabel}</span>
                          <span>
                            {
                              allScore.find(
                                (item: any) =>
                                  item.refQCategoryId ==
                                  subCategory_04.refQCategoryId
                              )?.refPTScore
                            }
                          </span>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="pastReport_AccCont_div2_sublist">
                    <span>
                      {
                        allScore.find(
                          (item: any) =>
                            item.refQCategoryId == subCategory_03.refQCategoryId
                        )?.refPTScore
                      }
                    </span>
                  </div>
                )}
              </div>
              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid lightgrey",
                }}
              ></div>
            </>
          )
        )}
      </div>
    );
  }
};

export default ReportContent;
