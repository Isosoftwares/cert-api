 const orderNotificationFunction = async (message, link) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  ><head
    ><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta
      http-equiv="X-UA-Compatible"
      content="IE=edge"
    /><meta name="format-detection" content="telephone=no" /><meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    /><title>order Notification</title
    ><style type="text/css" emogrify="no">
      #outlook a {
        padding: 0;
      }
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
      table td {
        border-collapse: collapse;
        mso-line-height-rule: exactly;
      }
      .editable.image {
        font-size: 0 !important;
        line-height: 0 !important;
      }
      .nl2go_preheader {
        display: none !important;
        mso-hide: all !important;
        mso-line-height-rule: exactly;
        visibility: hidden !important;
        line-height: 0px !important;
        font-size: 0px !important;
      }
      body {
        width: 100% !important;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        margin: 0;
        padding: 0;
      }
      img {
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      a img {
        border: none;
      }
      table {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      th {
        font-weight: normal;
        text-align: left;
      }
      *[class="gmail-fix"] {
        display: none !important;
      }</style
    ><style type="text/css" emogrify="no">
      @media (max-width: 600px) {
        .gmx-killpill {
          content: " ";
        }
      }</style
    ><style type="text/css" emogrify="no">
      @media (max-width: 600px) {
        .gmx-killpill {
          content: "";
        }
        .r0-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 320px !important;
        }
        .r1-i {
          background-color: #ffffff !important;
        }
        .r2-c {
          box-sizing: border-box !important;
          text-align: center !important;
          valign: top !important;
          width: 100% !important;
        }
        .r3-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 100% !important;
        }
        .r4-c {
          box-sizing: border-box !important;
          display: block !important;
          valign: top !important;
          width: 100% !important;
        }
        .r5-o {
          border-style: solid !important;
          width: 100% !important;
        }
        .r6-i {
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .r7-c {
          box-sizing: border-box !important;
          text-align: left !important;
          valign: top !important;
          width: 100% !important;
        }
        .r8-o {
          border-style: solid !important;
          margin: 0 auto 0 0 !important;
          margin-top: 20px !important;
          width: 100% !important;
        }
        .r9-i {
          background-color: #eff2f7 !important;
          padding-top: 15px !important;
          text-align: center !important;
        }
        .r10-c {
          box-sizing: border-box !important;
          text-align: center !important;
          width: 100% !important;
        }
        .r11-i {
          padding-bottom: 0px !important;
          padding-top: 0px !important;
        }
        .r12-o {
          border-style: solid !important;
          margin: 0 auto 0 0 !important;
          width: 100% !important;
        }
        .r13-i {
          padding-top: 15px !important;
          text-align: left !important;
        }
        .r14-i {
          padding-bottom: 15px !important;
          padding-top: 15px !important;
          text-align: left !important;
        }
        .r15-c {
          box-sizing: border-box !important;
          padding: 0 !important;
          text-align: center !important;
          valign: top !important;
          width: 100% !important;
        }
        .r16-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          margin-bottom: 15px !important;
          margin-top: 15px !important;
          width: 100% !important;
        }
        .r17-i {
          padding: 0 !important;
          text-align: center !important;
        }
        .r18-r {
          background-color: #fcb900 !important;
          border-radius: 4px !important;
          border-width: 0px !important;
          box-sizing: border-box;
          height: initial !important;
          padding: 0 !important;
          padding-bottom: 12px !important;
          padding-top: 12px !important;
          text-align: center !important;
          width: 100% !important;
        }
        .r19-i {
          padding-bottom: 20px !important;
          padding-left: 15px !important;
          padding-right: 15px !important;
          padding-top: 20px !important;
        }
        .r20-i {
          background-color: #eff2f7 !important;
        }
        .r21-c {
          box-sizing: border-box !important;
          text-align: center !important;
          valign: top !important;
          width: 320px !important;
        }
        .r22-i {
          color: #3b3f44 !important;
          padding-bottom: 0px !important;
          padding-top: 15px !important;
          text-align: center !important;
        }
        .r23-i {
          color: #3b3f44 !important;
          padding-bottom: 0px !important;
          padding-top: 0px !important;
          text-align: center !important;
        }
        .r24-i {
          padding-bottom: 15px !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
          padding-top: 0px !important;
        }
        .r25-c {
          box-sizing: border-box !important;
          text-align: center !important;
          valign: top !important;
          width: 129px !important;
        }
        .r26-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 129px !important;
        }
        body {
          -webkit-text-size-adjust: none;
        }
        .nl2go-responsive-hide {
          display: none;
        }
        .nl2go-body-table {
          min-width: unset !important;
        }
        .mobshow {
          height: auto !important;
          overflow: visible !important;
          max-height: unset !important;
          visibility: visible !important;
          border: none !important;
        }
        .resp-table {
          display: inline-table !important;
        }
        .magic-resp {
          display: table-cell !important;
        }
      }</style
    ><style type="text/css">
      p,
      h1,
      h2,
      h3,
      h4,
      ol,
      ul {
        margin: 0;
      }
      a,
      a:link {
        color: #0092ff;
        text-decoration: underline;
      }
      .nl2go-default-textstyle {
        color: #3b3f44;
        font-family: arial, helvetica, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        word-break: break-word;
      }
      .default-button {
        color: #ffffff;
        font-family: arial, helvetica, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: normal;
        line-height: 1.15;
        text-decoration: none;
        word-break: break-word;
      }
      .default-heading1 {
        color: #1f2d3d;
        font-family: arial, helvetica, sans-serif;
        font-size: 36px;
        word-break: break-word;
      }
      .default-heading2 {
        color: #1f2d3d;
        font-family: arial, helvetica, sans-serif;
        font-size: 32px;
        word-break: break-word;
      }
      .default-heading3 {
        color: #1f2d3d;
        font-family: arial, helvetica, sans-serif;
        font-size: 24px;
        word-break: break-word;
      }
      .default-heading4 {
        color: #1f2d3d;
        font-family: arial, helvetica, sans-serif;
        font-size: 18px;
        word-break: break-word;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .no-show-for-you {
        border: none;
        display: none;
        float: none;
        font-size: 0;
        height: 0;
        line-height: 0;
        max-height: 0;
        mso-hide: all;
        overflow: hidden;
        table-layout: fixed;
        visibility: hidden;
        width: 0;
      }</style
    ><!--[if mso
      ]><xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG /> <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml><!
    [endif]--><style type="text/css">
      a:link {
        color: #0092ff;
        text-decoration: underline;
      }
    </style></head
  ><body
    bgcolor="#ffffff"
    text="#3b3f44"
    link="#0092ff"
    yahoo="fix"
    style="background-color: #ffffff;"
  >
    <table
      cellspacing="0"
      cellpadding="0"
      border="0"
      role="presentation"
      class="nl2go-body-table"
      width="100%"
      style="background-color: #ffffff; width: 100%;"
      ><tr
        ><td>
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            role="presentation"
            width="600"
            align="center"
            class="r0-o"
            style="table-layout: fixed; width: 600px;"
            ><tr
              ><td valign="top" class="r1-i" style="background-color: #ffffff;">
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%;"
                  ><tr
                    ><td>
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                        ><tr
                          ><th
                            width="100%"
                            valign="top"
                            class="r4-c"
                            style="font-weight: normal;"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r5-o"
                              style="table-layout: fixed; width: 100%;"
                              ><tr
                                ><td valign="top" class="r6-i">
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                    ><tr
                                      ><td class="r7-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r8-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                          ><tr class="nl2go-responsive-hide"
                                            ><td
                                              height="20"
                                              style="
                                                font-size: 20px;
                                                line-height: 20px;
                                              "
                                              >­</td
                                            > </tr
                                          ><tr
                                            ><td
                                              align="center"
                                              valign="top"
                                              class="r9-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 16px;
                                                word-break: break-word;
                                                background-color: #eff2f7;
                                                line-height: 2;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div
                                                ><h2
                                                  class="default-heading2"
                                                  style="
                                                    margin: 0;
                                                    color: #1f2d3d;
                                                    font-family: arial,
                                                      helvetica, sans-serif;
                                                    font-size: 32px;
                                                    word-break: break-word;
                                                  "
                                                  >Agape Writing Services</h2
                                                ></div
                                              >
                                            </td>
                                          </tr></table
                                        ></td
                                      > </tr
                                    ><tr
                                      ><td class="r10-c" align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="600"
                                          class="r3-o"
                                          style="table-layout: fixed;"
                                          ><tr
                                            ><td
                                              class="r11-i"
                                              style="height: 3px;"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                role="presentation"
                                                ><tr
                                                  ><td
                                                    ><table
                                                      width="100%"
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                      role="presentation"
                                                      valign=""
                                                      class="r11-i"
                                                      height="3"
                                                      style="
                                                        border-top-style: solid;
                                                        background-clip: border-box;
                                                        border-top-color: #4a4a4a;
                                                        border-top-width: 3px;
                                                        font-size: 3px;
                                                        line-height: 3px;
                                                      "
                                                      ><tr
                                                        ><td
                                                          height="0"
                                                          style="
                                                            font-size: 0px;
                                                            line-height: 0px;
                                                          "
                                                          >­</td
                                                        >
                                                      </tr></table
                                                    ></td
                                                  >
                                                </tr></table
                                              ></td
                                            >
                                          </tr></table
                                        ></td
                                      > </tr
                                    ><tr
                                      ><td class="r7-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r12-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                          ><tr
                                            ><td
                                              align="left"
                                              valign="top"
                                              class="r13-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 16px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-top: 15px;
                                                text-align: left;
                                              "
                                            >
                                              <div
                                                ><h2
                                                  class="default-heading2"
                                                  style="
                                                    margin: 0;
                                                    color: #1f2d3d;
                                                    font-family: arial,
                                                      helvetica, sans-serif;
                                                    font-size: 32px;
                                                    word-break: break-word;
                                                  "
                                                  ><span
                                                    style="font-size: 15px;"
                                                    >Hello,</span
                                                  ></h2
                                                ></div
                                              >
                                            </td>
                                          </tr></table
                                        ></td
                                      > </tr
                                    ><tr
                                      ><td class="r7-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r12-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                          ><tr
                                            ><td
                                              align="left"
                                              valign="top"
                                              class="r14-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 16px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-bottom: 15px;
                                                padding-top: 15px;
                                                text-align: left;
                                              "
                                            >
                                              <div
                                                ><p style="margin: 0;"
                                                  >${message}</p
                                                ><p style="margin: 0;"> </p
                                              ></div>
                                            </td> </tr></table
                                      ></td> </tr
                                    ><tr
                                      ><td
                                        class="r15-c"
                                        align="center"
                                        style="
                                          align: center;
                                          padding-bottom: 15px;
                                          padding-top: 15px;
                                          valign: top;
                                        "
                                      >
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="300"
                                          class="r16-o"
                                          style="
                                            background-color: #fcb900;
                                            border-collapse: separate;
                                            border-color: #fcb900;
                                            border-radius: 4px;
                                            border-style: solid;
                                            border-width: 0px;
                                            table-layout: fixed;
                                            width: 300px;
                                          "
                                          ><tr
                                            ><td
                                              height="18"
                                              align="center"
                                              valign="top"
                                              class="r17-i nl2go-default-textstyle"
                                              style="
                                                word-break: break-word;
                                                background-color: #fcb900;
                                                border-radius: 4px;
                                                color: #ffffff;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 16px;
                                                font-style: normal;
                                                line-height: 1.15;
                                                padding-bottom: 12px;
                                                padding-top: 12px;
                                                text-align: center;
                                              "
                                            >
                                              <a
                                                href=${link}
                                                class="r18-r default-button"
                                                target="_blank"
                                                data-btn="1"
                                                style="
                                                  font-style: normal;
                                                  font-weight: normal;
                                                  line-height: 1.15;
                                                  text-decoration: none;
                                                  word-break: break-word;
                                                  word-wrap: break-word;
                                                  display: inline-block;
                                                  -webkit-text-size-adjust: none;
                                                  color: #ffffff;
                                                  font-family: arial, helvetica,
                                                    sans-serif;
                                                  font-size: 16px;
                                                "
                                              >
                                                <span
                                                  ><span style="color: #0b0a0a;"
                                                    ><strong
                                                      >Dashboard</strong
                                                    ></span
                                                  ></span
                                                ></a
                                              >
                                            </td>
                                          </tr></table
                                        ></td
                                      >
                                    </tr></table
                                  ></td
                                >
                              </tr></table
                            ></th
                          >
                        </tr></table
                      ></td
                    >
                  </tr></table
                ><table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%;"
                  ><tr
                    ><td
                      class="r19-i"
                      style="padding-bottom: 20px; padding-top: 20px;"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                        ><tr
                          ><th
                            width="100%"
                            valign="top"
                            class="r4-c"
                            style="font-weight: normal;"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r5-o"
                              style="table-layout: fixed; width: 100%;"
                              ><tr
                                ><td
                                  valign="top"
                                  class="r6-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                    ><tr
                                      ><td class="r7-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r12-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                          ><tr
                                            ><td
                                              align="left"
                                              valign="top"
                                              class="r14-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 16px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-bottom: 15px;
                                                padding-top: 15px;
                                                text-align: left;
                                              "
                                            >
                                              <div
                                                ><p style="margin: 0;"
                                                  >Regards,</p
                                                ><p style="margin: 0;"
                                                  >Agape writing Service.</p
                                                ></div
                                              >
                                            </td>
                                          </tr></table
                                        ></td
                                      >
                                    </tr></table
                                  ></td
                                >
                              </tr></table
                            ></th
                          >
                        </tr></table
                      ></td
                    >
                  </tr></table
                ></td
              >
            </tr></table
          ><table
            cellspacing="0"
            cellpadding="0"
            border="0"
            role="presentation"
            width="100%"
            align="center"
            class="r3-o"
            style="table-layout: fixed; width: 100%;"
            ><tr
              ><td
                valign="top"
                class="r20-i"
                style="background-color: #eff2f7;"
              >
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="600"
                  align="center"
                  class="r0-o"
                  style="table-layout: fixed; width: 600px;"
                  ><tr
                    ><td
                      class="r19-i"
                      style="padding-bottom: 20px; padding-top: 20px;"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                        ><tr
                          ><th
                            width="100%"
                            valign="top"
                            class="r4-c"
                            style="font-weight: normal;"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r5-o"
                              style="table-layout: fixed; width: 100%;"
                              ><tr
                                ><td
                                  valign="top"
                                  class="r6-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                    ><tr
                                      ><td class="r7-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r12-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                          ><tr
                                            ><td
                                              align="center"
                                              valign="top"
                                              class="r22-i nl2go-default-textstyle"
                                              style="
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div
                                                ><p style="margin: 0;"
                                                  >Agape Writing Service
                                                </p></div
                                              >
                                            </td>
                                          </tr></table
                                        ></td
                                      > </tr
                                    ><tr
                                      ><td class="r7-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r12-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                          ><tr
                                            ><td
                                              align="center"
                                              valign="top"
                                              class="r23-i nl2go-default-textstyle"
                                              style="
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                text-align: center;
                                              "
                                            >
                                              <div
                                                ><p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                  "
                                                  >All Rights Reserved!</p
                                                ></div
                                              >
                                            </td>
                                          </tr></table
                                        ></td
                                      > </tr
                                    ><tr
                                      ><td class="r10-c" align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          align="center"
                                          class="r3-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                          ><tr
                                            ><td
                                              valign="top"
                                              class="r24-i"
                                              style="padding-bottom: 15px;"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                role="presentation"
                                                ><tr
                                                  ><td
                                                    class="r25-c"
                                                    align="center"
                                                  >
                                                    <table
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                      role="presentation"
                                                      width="129"
                                                      class="r26-o"
                                                      style="
                                                        table-layout: fixed;
                                                      "
                                                      ><tr
                                                        ><td
                                                          height="48"
                                                          style="
                                                            font-size: 0px;
                                                            line-height: 0px;
                                                          "
                                                        ></td> </tr></table
                                                  ></td> </tr></table
                                            ></td> </tr></table
                                      ></td> </tr></table
                                ></td> </tr></table
                          ></th> </tr></table
                    ></td> </tr></table
              ></td> </tr></table
        ></td> </tr></table></body
></html>

    `;
};

module.exports = {
  orderNotificationFunction
}


