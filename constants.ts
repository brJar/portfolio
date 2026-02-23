/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { CanvasElement } from './types';

export const createDefaultElements = (id: string, title: string, image: string, description: string): CanvasElement[] => [];

export const CALM_COLORS = [
    '#A7BED3', '#C6E2E9', '#F1FFC4', '#FFCAAF', 
    '#DABFDE', '#C1BEB5', '#8E9AAF', '#CBC0D3', 
    '#EFD3D7', '#FEEAFA', '#8D99AE', '#2B2D42',
    '#4A5759', '#D0F4DE', '#E4C1F9', '#9DA9A0'
];

export const DEFAULT_CONTENT = {
    "heroOverlayText": "NEW PROJECT",
    "heroSubtitle": "Category",
    "mainText": "Project description.",
    "sidebarItem1": "Service",
    "sidebarItem2": "Year",
    "sidebarLink": "website.com",
    "card1Title": "Overview",
    "card2Title": "Concept",
    "card2Subtitle": "DETAILS",
    "aboutTitle": "About",
    "aboutText": "Description goes here.",
    "brandingTitle": "Branding",
    "mainPagesTitle": "Pages",
    "statsNumber": "0",
    "statsLabel": "stats",
    "galleryCard1Image": "",
    "galleryCard2Image": "",
    "galleryCard3Image": "",
    "brandingItem1Image": "",
    "brandingItem2Image": "",
    "mainPagesImage": "",
    "elements": [],
    "shortDescription": "Short description."
};
export const INITIAL_SITE_CONFIG = {
    "title": "Tarasenko Dmitry",
    "description": "UI/UX Designer portfolio showcasing web interfaces, sites, and mobile applications.",
    "gaId": "",
    "favicon": "/uploads/1771799381143-767493840.svg"
};
export const INITIAL_MAIN_CONTENT = {
    "welcome": "Hi, I'm",
    "title": "Tarasenko Dmitry",
    "subtitle": "UI/UX Interface Designer",
    "description": "I develop web interfaces, sites, mobile applications and landing pages."
};
export const INITIAL_SERVICES_CONTENT = {
    "title": "My Services",
    "items": [
        {
            "title": "UI/UX Design",
            "desc": "Creating intuitive and aesthetically pleasing interfaces that drive user engagement."
        },
        {
            "title": "Branding",
            "desc": "Crafting unique visual identities that resonate with your target audience."
        },
        {
            "title": "AI-Assisted Art Direction",
            "desc": " Streamlining the creative workflow by using AI as a co-pilot for repetitive tasks and complex image manipulation."
        }
    ]
};
export const INITIAL_REVIEWS_CONTENT = {
    "title": "Client Reviews",
    "items": [
        {
            "text": "Dmitry is a rare find who combines strategic product thinking with high-end design skills. He managed our project from initial technical requirements to the final launch, staying on budget and ahead of schedule.",
            "author": "Victor Shishov, CEO of Web-VIKI"
        },
        {
            "text": "Dmitry took our brand from zero to a fully realized corporate identity. The logo, color palette, and advertising materials he created perfectly capture our company’s DNA.",
            "author": "Ivan Makarov, Marketing Director of SMU-87"
        }
    ]
};
export const INITIAL_PROJECTS = [
    {
        "id": "p1",
        "title": "Grand Crystal",
        "desc": "Real Estate sITE",
        "shortDescription": "I ensured that the premium feel is maintained across all devices, with a mobile-first approach that caters to high-net-worth clients who often browse on the go.",
        "image": "/uploads/1770409280715-330936380.png",
        "heroOverlayText": "GRANDCRYSTAL.STUDIO",
        "elements": [
            {
                "id": "p1_sec1",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 0,
                "content": "",
                "children": [
                    {
                        "id": "p1_t1",
                        "type": "text",
                        "content": "2025 • WEB DESIGN",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "16px",
                            "fontWeight": "600",
                            "color": "#888",
                            "letterSpacing": "0.15em",
                            "textAlign": "left"
                        }
                    },
                    {
                        "id": "p1_t2",
                        "type": "text",
                        "content": "GRAND CRYSTAL",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "96px",
                            "fontWeight": "800",
                            "color": "#111",
                            "letterSpacing": "-0.04em",
                            "lineHeight": "0.9",
                            "textAlign": "left"
                        }
                    }
                ]
            },
            {
                "id": "p1_sec2",
                "type": "section",
                "cols": 1,
                "gap": 0,
                "paddingY": 40,
                "content": "",
                "children": [
                    {
                        "id": "mlxmto0js5qxccruxsc",
                        "type": "image",
                        "content": "/uploads/1771757763661-404689730.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    }
                ]
            },
            {
                "id": "p1_sec3",
                "type": "section",
                "cols": 3,
                "gap": 48,
                "paddingY": 40,
                "content": "",
                "children": [
                    {
                        "id": "p1_t3",
                        "type": "text",
                        "content": "The project was designed to act as a high-conversion sales tool, bridging the gap between architectural vision and property investment.",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "24px",
                            "lineHeight": "1.4",
                            "fontWeight": "400",
                            "color": "#1a1a1a",
                            "textAlign": "left",
                            "gridColumn": "span 2"
                        }
                    },
                    {
                        "id": "p1_t4",
                        "type": "text",
                        "content": "<b>Services:</b><br/>UI/UX Design<br/>Management<br/>Art Direction",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "16px",
                            "lineHeight": "1.8",
                            "fontWeight": "500",
                            "color": "#333",
                            "textAlign": "left"
                        }
                    }
                ]
            },
            {
                "id": "p1_sec4",
                "type": "section",
                "cols": 2,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "children": [
                    {
                        "id": "p1_img1",
                        "type": "image",
                        "content": "/uploads/1771756714268-129192001.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "borderRadius": "12px",
                            "aspectRatio": "auto",
                            "gridColumn": "auto",
                            "gridRow": "auto",
                            "objectFit": "fill"
                        }
                    },
                    {
                        "id": "p1_img2",
                        "type": "image",
                        "content": "/uploads/1771756756374-136542853.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "borderRadius": "12px",
                            "aspectRatio": "auto",
                            "gridColumn": "auto",
                            "gridRow": "span 2",
                            "objectFit": "fill"
                        }
                    },
                    {
                        "id": "mlxm7dhuoz2p1do0nbl",
                        "type": "image",
                        "content": "/uploads/1771756751525-482831090.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "fill"
                        }
                    }
                ]
            },
            {
                "id": "p1_sec5",
                "type": "section",
                "cols": 4,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "children": [
                    {
                        "id": "p1_t5",
                        "type": "text",
                        "content": "<h3><span data-metadata=\"&lt;!--(figmeta)eyJmaWxlS2V5Ijoidm9KcWdacHlNOGNaWG1wYlJIbnFmMSIsInBhc3RlSUQiOjgyODI3NTA0MCwiZGF0YVR5cGUiOiJzY2VuZSJ9Cg==(/figmeta)--&gt;\"></span>Font Grand Crystal</h3>",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "18px",
                            "textAlign": "left",
                            "maxWidth": "800px",
                            "gridColumn": "span 3"
                        }
                    },
                    {
                        "id": "mlxmd6xi58vg1z67st",
                        "type": "text",
                        "content": "<span data-metadata=\"&lt;!--(figmeta)eyJmaWxlS2V5Ijoidm9KcWdacHlNOGNaWG1wYlJIbnFmMSIsInBhc3RlSUQiOjEzNzE2ODUzMjYsImRhdGFUeXBlIjoic2NlbmUifQo=(/figmeta)--&gt;\"></span><h3>Colors</h3>",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "16px",
                            "textAlign": "left"
                        }
                    },
                    {
                        "id": "mlxmd7xtzr6fwxi5kmb",
                        "type": "image",
                        "content": "/uploads/1771757000119-220309852.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#ffffff",
                            "objectFit": "horizontal",
                            "gridRow": "auto",
                            "gridColumn": "span 3"
                        }
                    },
                    {
                        "id": "mlxmd88ngioibzxw7sv",
                        "type": "image",
                        "content": "/uploads/1771757023091-742603589.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#ffffff",
                            "objectFit": "fill"
                        }
                    }
                ]
            },
            {
                "id": "p1_sec6",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "children": []
            },
            {
                "id": "mlxmpl0zyzrgalnk9ub",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "children": [
                    {
                        "id": "mlxmr1zrlecipcxc32g",
                        "type": "text",
                        "content": "<h3>Main Pages</h3>",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "32px",
                            "textAlign": "left"
                        }
                    },
                    {
                        "id": "mlxmr2jkps9lijr32i",
                        "type": "image",
                        "content": "/uploads/1771758509540-133780755.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#ffffff",
                            "objectFit": "horizontal"
                        }
                    }
                ],
                "style": {
                    "backgroundColor": "transparent"
                }
            },
            {
                "id": "mlxmpplx02vgbtitj9yw",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "children": [],
                "style": {
                    "backgroundColor": "transparent"
                }
            }
        ]
    },
    {
        "id": "p2",
        "title": "Linkor",
        "desc": "Web agency",
        "shortDescription": "Complete redesign of the agency's digital presence to align with current web trends and business goals.",
        "image": "/uploads/1770409300563-339542379.png",
        "heroOverlayText": "LINKOR.STUDIO",
        "elements": [
            {
                "id": "p2_sec1",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 0,
                "content": "",
                "children": [
                    {
                        "id": "p2_t1",
                        "type": "text",
                        "content": "INTERFACE DESIGN",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "16px",
                            "fontWeight": "600",
                            "color": "#888",
                            "textAlign": "left"
                        }
                    },
                    {
                        "id": "p2_t2",
                        "type": "text",
                        "content": "LINKOR AGENCY",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "96px",
                            "fontWeight": "800",
                            "textAlign": "left",
                            "lineHeight": "0.9"
                        }
                    }
                ]
            },
            {
                "id": "p2_sec2",
                "type": "section",
                "cols": 1,
                "gap": 0,
                "paddingY": 40,
                "content": "",
                "children": [
                    {
                        "id": "p2_hero",
                        "type": "image",
                        "content": "/uploads/1771757867850-370487383.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "borderRadius": "24px",
                            "aspectRatio": "auto",
                            "backgroundColor": "#DABFDE",
                            "objectFit": "horizontal"
                        }
                    }
                ]
            },
            {
                "id": "p2_sec3",
                "type": "section",
                "cols": 1,
                "gap": 48,
                "paddingY": 40,
                "content": "",
                "children": [
                    {
                        "id": "p2_t3",
                        "type": "text",
                        "content": "Linkor is a web agency dedicated to crafting unique digital experiences. From concept to launch, we ensure every pixel serves a purpose.",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "24px",
                            "lineHeight": "1.5",
                            "textAlign": "left"
                        }
                    }
                ]
            },
            {
                "id": "p2_sec4",
                "type": "section",
                "cols": 2,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "children": [
                    {
                        "id": "p2_img1",
                        "type": "image",
                        "content": "/uploads/1771757963530-245672826.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "borderRadius": "12px",
                            "aspectRatio": "auto",
                            "objectFit": "contain",
                            "gridRow": "span 2"
                        }
                    },
                    {
                        "id": "p2_img2",
                        "type": "image",
                        "content": "/uploads/1771757981511-651581380.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "borderRadius": "12px",
                            "aspectRatio": "auto",
                            "gridRow": "auto",
                            "objectFit": "cover"
                        }
                    },
                    {
                        "id": "mlxmx83cqy6gni48pnq",
                        "type": "image",
                        "content": "/uploads/1771757988656-40841767.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "gridColumn": "auto",
                            "gridRow": "auto",
                            "objectFit": "cover"
                        }
                    }
                ]
            },
            {
                "id": "mlxn0ujj4poovf5j5p",
                "type": "section",
                "cols": 3,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "children": [
                    {
                        "id": "mlxn0ujjac475gm210q",
                        "type": "text",
                        "content": "Branding",
                        "w": 0,
                        "h": 0,
                        "x": 0,
                        "y": 0,
                        "style": {
                            "fontSize": "32px",
                            "fontWeight": "800",
                            "textAlign": "left",
                            "marginBottom": "20px",
                            "gridColumn": "span 3"
                        }
                    },
                    {
                        "id": "mlxn13lztcc9b2qpvn",
                        "type": "image",
                        "content": "/uploads/1771758119914-349358554.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    },
                    {
                        "id": "mlxn1559wlz0xz2v8i",
                        "type": "image",
                        "content": "/uploads/1771758125389-368215925.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    },
                    {
                        "id": "mlxn15b71cvxbyloouri",
                        "type": "image",
                        "content": "/uploads/1771758129465-409046821.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    }
                ],
                "style": {
                    "backgroundColor": "transparent"
                }
            },
            {
                "id": "mlxn2yiqeo298p4isqg",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "children": [
                    {
                        "id": "mlxn2yiqbpiw5xo0lzf",
                        "type": "text",
                        "content": "Main Pages",
                        "w": 0,
                        "h": 0,
                        "x": 0,
                        "y": 0,
                        "style": {
                            "fontSize": "32px",
                            "fontWeight": "800",
                            "textAlign": "left",
                            "marginBottom": "20px"
                        }
                    },
                    {
                        "id": "mlxn462jztv6lw5fjsb",
                        "type": "image",
                        "content": "/uploads/1771758252612-450072537.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    },
                    {
                        "id": "mlxn5nstre2r5vhl6ge",
                        "type": "image",
                        "content": "/uploads/1771758325418-420833672.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    }
                ],
                "style": {
                    "backgroundColor": "transparent"
                }
            },
            {
                "id": "mlxn4ou3zeq0zp166d",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "children": [],
                "style": {
                    "backgroundColor": "transparent"
                }
            }
        ]
    },
    {
        "id": "p3",
        "title": "Web-VIKI",
        "desc": "Web agency",
        "shortDescription": "Making complex technical services accessible and attractive.",
        "image": "/uploads/1770409309605-323588290.png",
        "heroOverlayText": "WEB-VIKI.STUDIO",
        "elements": [
            {
                "id": "p3_sec1",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 0,
                "content": "",
                "children": [
                    {
                        "id": "p3_t1",
                        "type": "text",
                        "content": "UI/UX &amp; DEVELOPMENT",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "16px",
                            "fontWeight": "600",
                            "color": "#888",
                            "textAlign": "left"
                        }
                    },
                    {
                        "id": "p3_t2",
                        "type": "text",
                        "content": "WEB-VIKI",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "96px",
                            "fontWeight": "800",
                            "textAlign": "left",
                            "lineHeight": "0.9"
                        }
                    }
                ]
            },
            {
                "id": "p3_sec2",
                "type": "section",
                "cols": 1,
                "gap": 0,
                "paddingY": 40,
                "content": "",
                "children": [
                    {
                        "id": "p3_hero",
                        "type": "image",
                        "content": "/uploads/1771758602335-298323769.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "borderRadius": "24px",
                            "aspectRatio": "auto",
                            "backgroundColor": "#EFD3D7",
                            "objectFit": "horizontal"
                        }
                    }
                ]
            },
            {
                "id": "p3_sec3",
                "type": "section",
                "cols": 1,
                "gap": 48,
                "paddingY": 40,
                "content": "",
                "children": [
                    {
                        "id": "p3_t3",
                        "type": "text",
                        "content": "Web-VIKI helps businesses grow by building modern, responsive, and user-friendly websites. We focus on performance and SEO optimization.",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "24px",
                            "textAlign": "left"
                        }
                    }
                ]
            },
            {
                "id": "p3_sec4",
                "type": "section",
                "cols": 2,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "children": [
                    {
                        "id": "mlxndyqyjfnebsmvxf",
                        "type": "text",
                        "content": "<b>Branding</b>",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "32px",
                            "textAlign": "left",
                            "gridColumn": "span 2"
                        }
                    },
                    {
                        "id": "mlxne5t4zvkof5j5n59",
                        "type": "image",
                        "content": "/uploads/1771758722129-872997388.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    },
                    {
                        "id": "mlxne65jp2geaqkp37",
                        "type": "image",
                        "content": "/uploads/1771758728288-578322395.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    }
                ]
            },
            {
                "id": "p3_sec5",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "children": [
                    {
                        "id": "p3_t4",
                        "type": "text",
                        "content": "<b style=\"color: rgb(26, 26, 26); font-size: 32px;\">Main Page</b>",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "32px",
                            "color": "#555",
                            "textAlign": "left"
                        }
                    },
                    {
                        "id": "mlxngx6ajy0x6ihvg8b",
                        "type": "image",
                        "content": "/uploads/1771758847686-842511228.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    }
                ]
            },
            {
                "id": "mlxnjjiggrd734c82ue",
                "type": "section",
                "cols": 3,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "children": [
                    {
                        "id": "mlxnjjigbghg2lcskbt",
                        "type": "image",
                        "content": "/uploads/1771758976195-201436018.png",
                        "w": 0,
                        "h": 0,
                        "x": 0,
                        "y": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "contain"
                        }
                    },
                    {
                        "id": "mlxnjmy4oblevess2wk",
                        "type": "image",
                        "content": "/uploads/1771758979902-828431271.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "contain"
                        }
                    },
                    {
                        "id": "mlxnjn2hda7q4fi7voq",
                        "type": "image",
                        "content": "/uploads/1771758983989-603860317.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "contain"
                        }
                    }
                ],
                "style": {
                    "backgroundColor": "transparent"
                }
            },
            {
                "id": "mlxnktrzlylw0r10zn",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "children": [
                    {
                        "id": "mlxnktrz2w9du10tq18",
                        "type": "text",
                        "content": "Presentations",
                        "w": 0,
                        "h": 0,
                        "x": 0,
                        "y": 0,
                        "style": {
                            "fontSize": "48px",
                            "fontWeight": "800",
                            "textAlign": "left",
                            "marginBottom": "20px"
                        }
                    },
                    {
                        "id": "mlxnkxgtppw965e32ui",
                        "type": "image",
                        "content": "/uploads/1771759056075-554134937.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    }
                ],
                "style": {
                    "backgroundColor": "transparent"
                }
            }
        ]
    },
    {
        "id": "mlbfv893py1f2abx1g",
        "title": "SADOWKA",
        "desc": "E-Commerce",
        "image": "/uploads/1770415825264-10491179.png",
        "shortDescription": "Responsive website design focused on mobile usability, allowing customers to shop for their garden on the go.",
        "heroOverlayText": "NEW PROJECT",
        "heroSubtitle": "Category",
        "mainText": "Project description.",
        "sidebarItem1": "Service",
        "sidebarItem2": "Year",
        "sidebarLink": "website.com",
        "card1Title": "Overview",
        "card2Title": "Concept",
        "card2Subtitle": "DETAILS",
        "aboutTitle": "About",
        "aboutText": "Description goes here.",
        "brandingTitle": "Branding",
        "mainPagesTitle": "Pages",
        "statsNumber": "0",
        "statsLabel": "stats",
        "galleryCard1Image": "",
        "galleryCard2Image": "",
        "galleryCard3Image": "",
        "brandingItem1Image": "",
        "brandingItem2Image": "",
        "mainPagesImage": "",
        "elements": [
            {
                "id": "mlxotl1pa84owcx9gu",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "children": [
                    {
                        "id": "mlxotl1pegck3qjiat",
                        "type": "text",
                        "content": "<font color=\"#888888\"><span style=\"font-size: 16px; letter-spacing: 2.4px;\"><b>E-Commerce</b></span></font>",
                        "w": 0,
                        "h": 0,
                        "x": 0,
                        "y": 0,
                        "style": {
                            "fontSize": "18px",
                            "textAlign": "left",
                            "color": "#666"
                        }
                    },
                    {
                        "id": "mlxoubqfydehzzzz1d",
                        "type": "text",
                        "content": "<span style=\"font-size: 48px; font-weight: 800;\">Sadowka</span>",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "16px",
                            "textAlign": "left"
                        }
                    },
                    {
                        "id": "mlxouvx3jsd3ofjadmo",
                        "type": "image",
                        "content": "/uploads/1771762043260-339899315.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    }
                ],
                "style": {
                    "backgroundColor": "transparent"
                }
            },
            {
                "id": "mlxpeapqe7nu74mzwvk",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "children": [
                    {
                        "id": "mlxphcfad8371ze7zyb",
                        "type": "image",
                        "content": "/uploads/1771762270955-151535347.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#ffffff",
                            "objectFit": "horizontal"
                        }
                    }
                ],
                "style": {
                    "backgroundColor": "transparent"
                }
            },
            {
                "id": "mlxpfel61lwztwleoe1",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "children": [
                    {
                        "id": "mlxpfel68bk1v9dmww5",
                        "type": "image",
                        "content": "/uploads/1771762174685-423699176.png",
                        "w": 0,
                        "h": 0,
                        "x": 0,
                        "y": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    }
                ],
                "style": {
                    "backgroundColor": "transparent"
                }
            }
        ]
    },
    {
        "id": "p5",
        "title": "VIKI.JET.WMS",
        "desc": "WMS",
        "shortDescription": "Comprehensive UX/UI design for an advanced Warehouse Management System (WMS), focusing on data clarity and operational efficiency.",
        "image": "/uploads/1770416346607-468378284.png",
        "heroOverlayText": "ECO.STORE",
        "elements": [
            {
                "id": "p5_sec1",
                "type": "section",
                "cols": 1,
                "paddingY": 0,
                "gap": 24,
                "content": "",
                "style": {
                    "backgroundColor": "transparent"
                },
                "children": [
                    {
                        "id": "p5_tag",
                        "type": "text",
                        "content": "NEW PROJECT",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "16px",
                            "fontWeight": "600",
                            "color": "#888",
                            "letterSpacing": "0.15em",
                            "textAlign": "left"
                        }
                    },
                    {
                        "id": "p5_title",
                        "type": "text",
                        "content": "Eco Store",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "96px",
                            "fontWeight": "800",
                            "lineHeight": "0.9",
                            "color": "#111",
                            "textAlign": "left"
                        }
                    }
                ]
            },
            {
                "id": "p5_sec2",
                "type": "section",
                "cols": 1,
                "paddingY": 40,
                "gap": 0,
                "content": "",
                "children": [
                    {
                        "id": "p5_hero",
                        "type": "image",
                        "content": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "16/9",
                            "borderRadius": "24px",
                            "backgroundColor": "#e0e0e0"
                        }
                    }
                ]
            },
            {
                "id": "p5_sec3",
                "type": "section",
                "cols": 1,
                "paddingY": 40,
                "gap": 24,
                "content": "",
                "children": [
                    {
                        "id": "p5_desc",
                        "type": "text",
                        "content": "An e-commerce platform dedicated to sustainable products with a nature-inspired aesthetic.",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "24px",
                            "lineHeight": "1.5",
                            "maxWidth": "800px",
                            "textAlign": "left"
                        }
                    }
                ]
            }
        ],
        "isHidden": true
    },
    {
        "id": "p4",
        "title": "GRAND VILLAGE",
        "desc": "REAL ETATE SIte\n",
        "shortDescription": "Clean and modern web presence for Grand Village, designed to attract potential buyers and investors.",
        "image": "/uploads/1770409351614-297199998.png",
        "heroOverlayText": "FINTECH.APP",
        "elements": [
            {
                "id": "p4_sec1",
                "type": "section",
                "cols": 1,
                "paddingY": 0,
                "gap": 24,
                "content": "",
                "style": {
                    "backgroundColor": "transparent"
                },
                "children": [
                    {
                        "id": "p4_tag",
                        "type": "text",
                        "content": "NEW PROJECT",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "16px",
                            "fontWeight": "600",
                            "color": "#888",
                            "letterSpacing": "0.15em",
                            "textAlign": "left"
                        }
                    },
                    {
                        "id": "p4_title",
                        "type": "text",
                        "content": "FinTech App",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "96px",
                            "fontWeight": "800",
                            "lineHeight": "0.9",
                            "color": "#111",
                            "textAlign": "left"
                        }
                    }
                ]
            },
            {
                "id": "p4_sec2",
                "type": "section",
                "cols": 1,
                "paddingY": 40,
                "gap": 0,
                "content": "",
                "children": [
                    {
                        "id": "p4_hero",
                        "type": "image",
                        "content": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "16/9",
                            "borderRadius": "24px",
                            "backgroundColor": "#e0e0e0"
                        }
                    }
                ]
            },
            {
                "id": "p4_sec3",
                "type": "section",
                "cols": 1,
                "paddingY": 40,
                "gap": 24,
                "content": "",
                "children": [
                    {
                        "id": "p4_desc",
                        "type": "text",
                        "content": "A revolutionary mobile banking experience focused on simplicity and speed.",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "24px",
                            "lineHeight": "1.5",
                            "maxWidth": "800px",
                            "textAlign": "left"
                        }
                    }
                ]
            }
        ],
        "isHidden": true
    },
    {
        "id": "mlbc1cj0ghdmalzschk",
        "title": "U-SOFT",
        "desc": "Corporate Site",
        "image": "/uploads/1770415786590-644421261.png",
        "shortDescription": "Corporate website design for a leading 1C software integrator, emphasizing professional expertise and business automation solutions.",
        "heroOverlayText": "NEW PROJECT",
        "heroSubtitle": "Category",
        "mainText": "Project description.",
        "sidebarItem1": "Service",
        "sidebarItem2": "Year",
        "sidebarLink": "website.com",
        "card1Title": "Overview",
        "card2Title": "Concept",
        "card2Subtitle": "DETAILS",
        "aboutTitle": "About",
        "aboutText": "Description goes here.",
        "brandingTitle": "Branding",
        "mainPagesTitle": "Pages",
        "statsNumber": "0",
        "statsLabel": "stats",
        "galleryCard1Image": "",
        "galleryCard2Image": "",
        "galleryCard3Image": "",
        "brandingItem1Image": "",
        "brandingItem2Image": "",
        "mainPagesImage": "",
        "elements": [],
        "isHidden": true
    },
    {
        "id": "mlxobsau0obbei7agm2o",
        "title": "BRIGHTUM",
        "desc": "Web Studio",
        "shortDescription": "I ensured that the premium feel is maintained across all devices, with a mobile-first approach that caters to high-net-worth clients who often browse on the go.",
        "image": "/uploads/1771760372820-607914037.png",
        "heroOverlayText": "GRANDCRYSTAL.STUDIO",
        "elements": [
            {
                "id": "mlxobsaui24xu8iopm_copy",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 0,
                "content": "",
                "children": [
                    {
                        "id": "p1_t1",
                        "type": "text",
                        "content": "WEB DESIGN",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "16px",
                            "fontWeight": "600",
                            "color": "#888",
                            "letterSpacing": "0.15em",
                            "textAlign": "left"
                        }
                    },
                    {
                        "id": "p1_t2",
                        "type": "text",
                        "content": "BRIGHTUM",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "96px",
                            "fontWeight": "800",
                            "color": "#111",
                            "letterSpacing": "-0.04em",
                            "lineHeight": "0.9",
                            "textAlign": "left"
                        }
                    }
                ]
            },
            {
                "id": "mlxobsau85hh8xjlzrw_copy",
                "type": "section",
                "cols": 1,
                "gap": 0,
                "paddingY": 40,
                "content": "",
                "children": [
                    {
                        "id": "mlxmto0js5qxccruxsc",
                        "type": "image",
                        "content": "/uploads/1771760405405-500756572.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    }
                ]
            },
            {
                "id": "mlxobsauiadwjcu154_copy",
                "type": "section",
                "cols": 3,
                "gap": 48,
                "paddingY": 40,
                "content": "",
                "children": [
                    {
                        "id": "p1_t3",
                        "type": "text",
                        "content": "Brightum is a web studio specializing in the development of modern websites and mobile applications. The company offers a full cycle of services — from designing and creating digital products to their next support and promotion.",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "24px",
                            "lineHeight": "1.4",
                            "fontWeight": "400",
                            "color": "#1a1a1a",
                            "textAlign": "left",
                            "gridColumn": "span 2"
                        }
                    },
                    {
                        "id": "p1_t4",
                        "type": "text",
                        "content": "<b>UI/UX Design<br>Art Direction</b>",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "16px",
                            "lineHeight": "1.8",
                            "fontWeight": "500",
                            "color": "#333",
                            "textAlign": "left"
                        }
                    }
                ]
            },
            {
                "id": "mlxobsaukhl5s6bcp8q_copy",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "children": [
                    {
                        "id": "mlxmr1zrlecipcxc32g",
                        "type": "text",
                        "content": "<h3>Main Page</h3>",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "fontSize": "32px",
                            "textAlign": "left"
                        }
                    },
                    {
                        "id": "mlxoj0e1w807btstrb9",
                        "type": "image",
                        "content": "/uploads/1771760624666-990790700.png",
                        "x": 0,
                        "y": 0,
                        "w": 0,
                        "h": 0,
                        "style": {
                            "aspectRatio": "auto",
                            "backgroundColor": "#f0f0f0",
                            "objectFit": "horizontal"
                        }
                    }
                ],
                "style": {
                    "backgroundColor": "transparent"
                }
            },
            {
                "id": "mlxobsau0hwhlgsrpce8_copy",
                "type": "section",
                "cols": 1,
                "gap": 24,
                "paddingY": 40,
                "content": "",
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "children": [],
                "style": {
                    "backgroundColor": "transparent"
                }
            }
        ]
    }
];
