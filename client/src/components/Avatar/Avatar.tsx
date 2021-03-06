import styled, {
  css,
  StyledComponentProps,
  DefaultTheme,
} from "styled-components";
import raw from "raw.macro";
import { hashCode } from "util/string";
import { theme } from "styles/theme";

type Props = StyledComponentProps<
  "div",
  DefaultTheme,
  {
    name: string;
    expandOnDesktop?: boolean;
  },
  never
>;

export const avatarMap = {
  0: raw("./svgs/0.svg"),
  1: raw("./svgs/1.svg"),
  2: raw("./svgs/2.svg"),
  3: raw("./svgs/3.svg"),
  4: raw("./svgs/4.svg"),
  5: raw("./svgs/5.svg"),
  6: raw("./svgs/6.svg"),
  7: raw("./svgs/7.svg"),
  8: raw("./svgs/8.svg"),
  9: raw("./svgs/9.svg"),
  10: raw("./svgs/10.svg"),
  11: raw("./svgs/11.svg"),
  12: raw("./svgs/12.svg"),
  13: raw("./svgs/13.svg"),
  14: raw("./svgs/14.svg"),
  15: raw("./svgs/15.svg"),
  16: raw("./svgs/16.svg"),
};

const length = Object.keys(avatarMap).length;

export const Avatar = ({ name, expandOnDesktop = true, ...rest }: Props) => {
  const avatar = hashCode(name, length);
  const svg = avatarMap[avatar as keyof typeof avatarMap];
  if (!svg) return null;
  return (
    <StyledIcon
      expandOnDesktop={expandOnDesktop}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...rest}
    />
  );
};

const StyledIcon = styled.div<{ expandOnDesktop: boolean }>`
  display: flex;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: flex-end;
  padding: ${theme.spacings(1)};
  background-repeat: no-repeat;
  background-size: contain;
  background-image: ${theme.ui.buttonFabBorderUrl};

  > svg {
    width: 100%;
    height: 80%;
    path {
      fill: ${theme.ui.text};
    }
  }

  ${theme.breakpoints.desktop} {
    ${({ expandOnDesktop }) =>
      expandOnDesktop &&
      css`
        display: inline-flex;
        width: auto;
        height: auto;
        border-radius: 0;
        overflow: hidden;
        background: none;
        overflow: auto;

        > svg {
          width: 100%;
          height: 100%;
        }
      `}
  }
`;
