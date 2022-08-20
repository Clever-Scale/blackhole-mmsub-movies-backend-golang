import {
  Autocomplete,
  Box,
  Button,
  colors,
  Container,
  createFilterOptions,
  Grid,
  Stack,
  styled,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { StyledTipTap } from "@components/Common";

function CreateMoviePage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const filter = createFilterOptions<typeof top100Films[0]>();

  return (
    <Box width={"100%"} height={"100%"}>
      <Container maxWidth={"xl"} disableGutters>
        <Toolbar disableGutters>
          <MovieIcon style={{ color: theme.palette.secondary.main }} />
          <Box width={10} />
          <Typography variant="h6">Create Movie</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            color={"secondary"}
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Outlet />
        </Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: theme.spacing(1),
                  boxShadow: `1px 1px 5px ${colors.grey[300]}`,
                  p: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
                  Search Movie Name
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <StyledAutoComplete
                      disablePortal
                      id="combo-box-demo"
                      options={top100Films}
                      size={"small"}
                      renderInput={(params) => (
                        <StyledTextField {...params} label="Movie" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color={"secondary"}
                      startIcon={<SearchIcon />}
                      fullWidth
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: theme.spacing(1),
                  boxShadow: `1px 1px 5px ${colors.grey[300]}`,
                  p: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
                  Media
                </Typography>
                <Box
                  sx={{
                    border: `3px solid ${colors.grey[300]}`,
                    borderStyle: "dotted",
                    borderRadius: theme.spacing(1),
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    alignItems: "center",
                    py: 4,
                  }}
                >
                  <AddIcon fontSize="small" />
                  <Typography variant="body2">Upload</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: theme.spacing(1),
                  boxShadow: `1px 1px 5px ${colors.grey[300]}`,
                  p: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
                  Movie Name
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <StyledTextField
                      type={"text"}
                      id="outlined-basic"
                      label="Movie Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <StyledAutoComplete
                      disablePortal
                      id="combo-box-demo"
                      options={top100Films}
                      multiple
                      getOptionLabel={(option: any) => option.label}
                      defaultValue={[top100Films[4]]}
                      filterSelectedOptions
                      size={"small"}
                      clearOnBlur
                      filterOptions={(options: any, params: any) => {
                        const filtered = filter(options, params);

                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some(
                          (option: any) => inputValue === option.label
                        );
                        if (inputValue !== "" && !isExisting) {
                          filtered.push({
                            label: inputValue,
                            year: 300,
                          });
                        }

                        return filtered;
                      }}
                      handleHomeEndKeys
                      renderInput={(params) => (
                        <StyledTextField {...params} label="Select Genres" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <StyledTextField
                      type={"text"}
                      id="outlined-basic"
                      label="Releacted Date"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <StyledTextField
                      type={"text"}
                      id="outlined-basic"
                      label="Resolution"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <StyledTextField
                      type={"text"}
                      id="outlined-basic"
                      label="File Size"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <StyledTextField
                      type={"text"}
                      id="outlined-basic"
                      label="Duration"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <StyledTextField
                      type={"text"}
                      id="outlined-basic"
                      label="IMDB Rating"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: theme.spacing(1),
                  boxShadow: `1px 1px 5px ${colors.grey[300]}`,
                  p: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
                  Share Movie Link
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <FacebookIcon sx={{ color: colors.blue[500] }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Facebook
                        </Typography>
                      </Box>
                      <StyledTextField
                        type={"text"}
                        id="outlined-basic"
                        label="Facebook Link"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <TelegramIcon sx={{ color: colors.blue[500] }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Telegram
                        </Typography>
                      </Box>
                      <StyledTextField
                        type={"text"}
                        id="outlined-basic"
                        label="Telegram Link"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  width: "100%",
                  borderRadius: theme.spacing(1),
                  p: 2,
                  boxSizing: "border-box",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
                  Movie Description
                </Typography>
                <StyledTipTap />
              </Box>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  width: "100%",
                  borderRadius: theme.spacing(1),
                  boxSizing: "border-box",
                  p: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
                  Movie Translator
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField
                      type={"text"}
                      id="outlined-basic"
                      label="Translator Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField
                      type={"text"}
                      id="outlined-basic"
                      label="Encoder Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  width: "100%",
                  borderRadius: theme.spacing(1),
                  boxSizing: "border-box",
                  p: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
                  Streaming Links
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <StyledTextField
                      type={"text"}
                      id="outlined-basic"
                      label="Streaming Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StyledTextField
                      type={"text"}
                      id="outlined-basic"
                      label="Streaming Links"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ borderColor: `${colors.grey["300"]}` }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Button
                        startIcon={<AddIcon />}
                        color="secondary"
                        variant="outlined"
                      >
                        Add Link
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  width: "100%",
                  borderRadius: theme.spacing(1),
                  boxSizing: "border-box",
                  p: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
                  Download Links
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <StyledTextField
                      type={"text"}
                      id="outlined-basic"
                      label="Download Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StyledTextField
                      type={"text"}
                      id="outlined-basic"
                      label="Download Links"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ borderColor: `${colors.grey["300"]}` }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Button
                        startIcon={<AddIcon />}
                        color="secondary"
                        variant="outlined"
                      >
                        Add Link
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: "#000",

    "&.Mui-focused": {
      color: "#000",
    },
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },
}));
const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  width: "100%",
  "&.Mui-focused": {
    color: "#000",
    borderColor: "#000",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },
}));
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];
export default CreateMoviePage;
