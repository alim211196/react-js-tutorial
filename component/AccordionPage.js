
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from "@material-ui/icons/GetApp";
import { memo } from "react";
import { Button, Link, List, ListItem, ListItemText } from '@material-ui/core';
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import styles from "../styles/Docs.module.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading1: {
    fontSize: '16px', 
    display: 'flex',
    alignItems: 'center'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  acc: {
    "& .MuiAccordion-root": {
      marginBottom: "5px",
    },
  },
}));

const AccordionPage = ({
  title,
  subtitles,
  handleChange,
  expanded,
  filename,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === title}
        onChange={handleChange(title)}
        style={{ background: "#000", marginBottom: "5px", color: "#fff" }}
      >
        <AccordionSummary>
          <div className={styles.responsive}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <DoubleArrowIcon />
              <Typography>{title}</Typography>
            </div>
            <Link href={`/docsFiles/${filename}`} target="_blank" download>
              <Button
                variant="contained"
                size="small"
                style={{
                  background: "#FE782A",
                  color: "#fff",
                  padding: "4px 10px",
                  fontSize: "12px",
                }}
                startIcon={<GetAppIcon />}
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
              >
                Download
              </Button>
            </Link>{" "}
          </div>
        </AccordionSummary>
        <AccordionDetails style={{ background: "#ee8d54", color: "#000" }}>
          <List>
            {subtitles.map((st, ind) => {
              return (
                <ListItem key={ind} className={classes.heading1}>
                  <DoubleArrowIcon />
                  <ListItemText> {st}</ListItemText>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default memo(AccordionPage);