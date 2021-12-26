import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import { H2, H5, H6 } from "../common/typography/Header";
import CommonTextField from "../common/textfields/CommonTextField";
import { Body1, Subtitle1 } from "../common/typography/Typography";
import { LightActiveCheckBox } from "../common/checkBox/LightActiveCheckBox";
import { RadioButton } from "../common/radioButton/RadioButton";
import { Select } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  formRoot: {
    maxWidth: 900,
    marginTop: 67,
    borderRadius: 12,
    "&>div": {
      "&>button": {
        marginRight: 16,
        marginBottom: 36,
      },
    },
  },
  formTitleSection: {
    height: "fit-content",
    width: "100%",
    "&>div": {
      borderRadius: 12,
      borderTop: "10px solid #9c27b0",
      background: "#FFFFFF",
      boxShadow: "0px 2px 4px rgb(16 7 33 / 12%)",
      padding: 16,
      marginBottom: 16,
      "&>hr": {
        margin: "16px 0",
      },
      "&>h5": {
        color: "#808080",
      },
    },
  },
  questionSection: {
    minHeight: "fit-content",
    background: "#FFFFFF",
    boxShadow: "0px 2px 4px rgb(16 7 33 / 12%)",
    borderRadius: 12,
    marginBottom: 16,
    "&>div": {
      padding: 26,
      "&>h6": {
        margin: "10px 0",
      },
      "&>div": {
        // width: "40%",
        margin: "8px 0",
      },
    },
  },
  formDropDown: {
    minWidth: 120,
    width: "auto !important",
  },
  radioGroup: {
    "&>label": {
      width: "100%",
    },
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const FormViewMain = ({ formData, updateFormDetails, user }) => {
  const classes = useStyles();

  const [formDetails, setFormDetails] = useState("");

  const [formCompArray, setformCompArray] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (formData !== undefined) {
      // setformCompArray(formData?.questions);
      setFormDetails(formData);
    }
  }, [formData]);

  useEffect(() => {
    if (formDetails?.questions !== undefined) {
      let tempArry = [...formDetails?.questions];
      formDetails?.questions.map((elem, i) => {
        if (elem.type === "checkBox") {
          tempArry[i] = { ...elem, ans: [] };
        } else {
          tempArry[i] = { ...elem, ans: "" };
        }
      });

      setformCompArray(tempArry);
    }
  }, [formDetails]);

  const handleCealrALL = () => {
    let tempArry = [...formDetails?.questions];
    formDetails?.questions.map((elem, i) => {
      if (elem.type === "checkBox") {
        tempArry[i] = { ...elem, ans: [] };
      } else {
        tempArry[i] = { ...elem, ans: "" };
      }
    });
    setEmail("");
    setformCompArray(tempArry);
  };

  const handleSubmit = () => {
    const response = {
      formId: formDetails._id,
      email,
      response: formCompArray,
    };

    console.log(response);
  };

  const handleChange = (value, index, type) => {
    const ansArr = [...formCompArray];
    // const tempObj = { ...formDetails };
    if (type === "checkBox") {
      //   ansArr[index].ans;
      if (ansArr[index].ans.includes(value)) {
        ansArr[index].ans = ansArr[index].ans.filter((elem) => elem !== value);
      } else {
        ansArr[index].ans.push(value);
      }
      setformCompArray(ansArr);
    } else {
      ansArr[index].ans = value;
      setformCompArray(ansArr);
    }
  };

  return (
    <Container className={classes.formRoot} maxWidth="md">
      <div className={classes.formTitleSection}>
        <div>
          <>
            <H2 bold>{formDetails?.name}</H2>

            <H5>{formDetails?.description}</H5>
          </>

          <Divider />
          <Subtitle1>Enter Valid Email</Subtitle1>
          <CommonTextField
            variant="standard"
            label="email"
            color="primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      {formCompArray &&
        formCompArray.map((que, index) => (
          <div className={classes.questionSection}>
            <div>
              <H6>{que?.questionText}</H6>
              {que?.type === "longQue" && (
                <CommonTextField
                  variant="standard"
                  color="primary"
                  value={que.ans}
                  multiline
                  onChange={(e) => handleChange(e.target.value, index)}
                />
              )}
              {que?.type === "shortQue" && (
                <CommonTextField
                  variant="standard"
                  color="primary"
                  value={que.ans}
                  onChange={(e) => handleChange(e.target.value, index)}
                />
              )}
              {que?.type === "dropDown" && (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={que.ans}
                  onChange={(e) => handleChange(e.target.value, index)}
                  autoWidth
                  className={classes.formDropDown}
                >
                  {que?.options.map((elem) => (
                    <MenuItem value={elem.optionText}>
                      {elem.optionText}
                    </MenuItem>
                  ))}
                </Select>
                // <Dropdown
                //   value={que.ans}
                //   list={que?.options}
                //   onChange={(e) => handleChange(e.target.value, index)}
                // />
              )}
              {que?.type === "checkBox" &&
                que?.options.map((elem) => (
                  <LightActiveCheckBox
                    checked={que.ans.includes(elem.optionText)}
                    onChecked={(e) =>
                      handleChange(elem.optionText, index, que?.type)
                    }
                  >
                    <Body1>{elem.optionText}</Body1>
                  </LightActiveCheckBox>
                ))}
              {que?.type === "multipleChoices" && (
                <div className={classes.radioGroup}>
                  {que?.options.map((elem) => (
                    <RadioButton
                      checked={que.ans.includes(elem.optionText)}
                      onChange={(e) => handleChange(elem.optionText, index)}
                    >
                      <Body1>{elem.optionText}</Body1>
                    </RadioButton>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      <div className={classes.buttonGroup}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button varian="outlined" color="primary" onClick={handleCealrALL}>
          clear all
        </Button>
      </div>
    </Container>
  );
};

export default FormViewMain;
