import {
  Box,
  Button,
  colors,
  Menu,
  MenuItem,
  Stack,
  styled,
  Tooltip,
  useTheme,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ListIcon from "@mui/icons-material/List";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatIndentDecreaseIcon from "@mui/icons-material/FormatIndentDecrease";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import React from "react";

interface StyledTipTapProps {
  minHeight?: number | string;
}

const StyledTipTap = (props: StyledTipTapProps) => {
  const { minHeight = "300px" } = props;
  const theme = useTheme();
  // Paragraph start //
  const [paragraph, setParagraph] = React.useState<null | HTMLElement>(null);
  const openParagraph = Boolean(paragraph);
  const handleClickParagraph = (event: React.MouseEvent<HTMLButtonElement>) => {
    setParagraph(event.currentTarget);
  };
  const handleCloseParagraph = () => {
    setParagraph(null);
  };
  // Paragraph end //
  // Aligment start //
  const [aligment, setAligment] = React.useState<null | HTMLElement>(null);
  const openAligment = Boolean(aligment);
  const handleClickAligment = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAligment(event.currentTarget);
  };
  const handleCloseAligment = () => {
    setAligment(null);
  };
  // List end //
  // List start //
  const [list, setList] = React.useState<null | HTMLElement>(null);
  const openList = Boolean(list);
  const handleClickList = (event: React.MouseEvent<HTMLButtonElement>) => {
    setList(event.currentTarget);
  };
  const handleCloseList = () => {
    setList(null);
  };
  // List end //
  return (
    <Box
      sx={{
        border: `1px solid ${colors.grey[300]}`,
        borderRadius: theme.spacing(1),
        width: "100%",
        position: "relative",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        sx={{ borderBottom: `1px solid ${colors.grey[300]}` }}
      >
        {/* Paragraph Start */}
        <Box sx={{ borderRight: `1px solid ${colors.grey[300]}` }}>
          <Tooltip title={"Formatting"} placement="top" arrow>
            <Button
              endIcon={<ArrowDropDownIcon />}
              id="basic-button"
              aria-controls={paragraph ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openParagraph ? "true" : undefined}
              onClick={handleClickParagraph}
              color={"inherit"}
            >
              Paragraph
            </Button>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={paragraph}
            open={openParagraph}
            onClose={handleCloseParagraph}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              "& .MuiList-root": {
                paddingTop: "0px",
                paddingBottom: "0px",
              },
              "& .MuiMenuItem-root": {
                borderBottom: `1px solid ${colors.grey[300]}`,
              },
            }}
          >
            <MenuItem onClick={handleCloseParagraph}>
              <span style={{ fontSize: 14 }}> Paragraph</span>
            </MenuItem>
            <MenuItem onClick={handleCloseParagraph}>
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                Header 1
              </span>
            </MenuItem>
            <MenuItem onClick={handleCloseParagraph}>
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                Header 2
              </span>
            </MenuItem>
            <MenuItem onClick={handleCloseParagraph}>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                Header 3
              </span>
            </MenuItem>
            <MenuItem onClick={handleCloseParagraph}>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                Header 4
              </span>
            </MenuItem>
            <MenuItem onClick={handleCloseParagraph}>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Header 5
              </span>
            </MenuItem>
            <MenuItem onClick={handleCloseParagraph}>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                Header 6
              </span>
            </MenuItem>
            <MenuItem onClick={handleCloseParagraph}>
              <span
                style={{
                  fontSize: 14,
                }}
              >
                Blockquote
              </span>
            </MenuItem>
          </Menu>
        </Box>
        {/* Paragraph end */}

        {/* Bold Start */}
        <Box>
          <Tooltip title={"Bold"} placement="top" arrow>
            <FormatBoldIcon />
          </Tooltip>
        </Box>
        {/* Bold end */}

        {/* Italic Start */}
        <Box>
          <Tooltip title={"Italic"} placement="top" arrow>
            <FormatItalicIcon />
          </Tooltip>
        </Box>
        {/* Italic end */}

        {/* Underline start */}
        <Box>
          <Tooltip title={"Underlined"} placement="top" arrow>
            <FormatUnderlinedIcon />
          </Tooltip>
        </Box>
        {/* UnderLine end */}

        {/* Aligment start */}
        <Box
          sx={{
            borderRight: `1px solid ${colors.grey[300]}`,
            borderLeft: `1px solid ${colors.grey[300]}`,
          }}
        >
          <Tooltip title={"Aligment"} placement="top" arrow>
            <Button
              endIcon={<ArrowDropDownIcon />}
              id="basic-button"
              aria-controls={aligment ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openAligment ? "true" : undefined}
              onClick={handleClickAligment}
              color={"inherit"}
            >
              <FormatIndentDecreaseIcon />
            </Button>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={aligment}
            open={openAligment}
            onClose={handleCloseAligment}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleCloseAligment}>
              <Tooltip title={"Left Align"} placement="right" arrow>
                <FormatAlignLeftIcon />
              </Tooltip>
            </MenuItem>
            <MenuItem onClick={handleCloseAligment}>
              <Tooltip title={"Center Align"} placement="right" arrow>
                <FormatAlignCenterIcon />
              </Tooltip>
            </MenuItem>
            <MenuItem onClick={handleCloseAligment}>
              <Tooltip title={"Right Align"} placement="right" arrow>
                <FormatAlignRightIcon />
              </Tooltip>
            </MenuItem>
          </Menu>
        </Box>
        {/* Aligment end */}

        {/* List start */}
        <Box
          sx={{
            borderRight: `1px solid ${colors.grey[300]}`,
            borderLeft: `1px solid ${colors.grey[300]}`,
          }}
        >
          <Tooltip title={"List"} placement="top" arrow>
            <Button
              endIcon={<ArrowDropDownIcon />}
              id="basic-button"
              aria-controls={list ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openList ? "true" : undefined}
              onClick={handleClickList}
              color={"inherit"}
            >
              <MoreHorizIcon />
            </Button>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={list}
            open={openList}
            onClose={handleCloseList}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleCloseList}>
              <Tooltip title={"Bulleted List"} placement="right" arrow>
                <FormatListBulletedIcon />
              </Tooltip>
            </MenuItem>
            <MenuItem onClick={handleCloseList}>
              <Tooltip title={"Number List"} placement="right" arrow>
                <FormatListNumberedIcon />
              </Tooltip>
            </MenuItem>
            <MenuItem onClick={handleCloseList}>
              <Tooltip title={"List"} placement="right" arrow>
                <ListIcon />
              </Tooltip>
            </MenuItem>
          </Menu>
        </Box>
        {/* List end */}
      </Stack>
      <Box
        sx={{ width: "100%", height: "100%", position: "relative", padding: 0 }}
      >
        <StyledTextarea minHeight={minHeight} />
      </Box>
    </Box>
  );
};

const StyledTextarea = styled("textarea")<{ minHeight: string | number }>(
  ({ theme, minHeight }) => ({
    width: "100%",
    height: "100%",
    minHeight: minHeight,
    border: "0px solid",
    "&:focus": {
      outline: "none",
    },
    resize: "vertical",
    margin: 0,
    padding: 0,
  })
);

export default StyledTipTap;
