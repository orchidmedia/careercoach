import ListOptions from "@/components/molecules/ListOptions";
import OptionDescription from "@/components/molecules/OptionDescription";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ButtonsRecommendations from "@/components/molecules/ButtonsRecommendations";
import Loader from "@/components/atoms/Loader";
import AlertError from "@/components/molecules/AlertError";

export const JobsBoard = () => {
  const router = useRouter();

  const [promptCareers, setPromptCareers]: any = useState();
  const [careers, setCareers]: any = useState();
  const [selected, setSelected]: any = useState();
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSaveCareers = () => {
    const localData = localStorage.getItem("promptCareers");
    if (localData) {
      setPromptCareers(localData);
    } else {
      setOpen(true);
    }
  };

  const hadleGetIdealPaths = async () => {
    setloading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      recommend: promptCareers,
    });
    await fetch(
      "https://careercoach-b957c7cfa4b2.herokuapp.com/search-career",
      {
        redirect: "follow",
        method: "POST",
        headers: myHeaders,
        body: raw,
      }
    )
      .then((response) => response.text())
      .then((result) => {
        setloading(false);
        const data = JSON.parse(result);
        setCareers(data);
        setSelected(data?.jobs_results[0]);
        if (
          data === null ||
          data === undefined ||
          data?.jobs_results?.length === 0
        ) {
          setOpen(true);
        }
      })
      .catch((error) => {
        setloading(false);
        setOpen(true);
        console.log("error", error);
      });
  };

  useEffect(() => {
    handleSaveCareers();
  }, []);

  useEffect(() => {
    if (promptCareers?.length > 0) {
      hadleGetIdealPaths();
    }
  }, [promptCareers]);

  return (
    <Box m={5}>
      <Box
        sx={{
          backgroundColor: "#FFF",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: "31px",
          paddingBottom: "25px",
        }}
      >
        <ListOptions
          type={"job"}
          title={"Job Opportunites"}
          options={careers}
          selected={selected}
          setSelected={setSelected}
        />
        <OptionDescription type={"job"} selected={selected} />
      </Box>
      <ButtonsRecommendations
        routerLink={careers?.search_metadata?.google_jobs_url}
        textContinue={"APPLY FOR THIS JOB"}
      />
      <Loader open={loading} />
      <AlertError
        open={open}
        setOpen={setOpen}
        message={
          "Unfortunately the search based on your career path and resume information didn't bring job offers from Google right now. Please try again in a couple of days, and use the insights and recommendation provided and reach out to directly to any company of your interest!"
        }
      />
    </Box>
  );
};
export default JobsBoard;
