import {
  Document,
  Font,
  Image,
  Page,
  pdf,
  PDFViewer,
  Text,
  View,
} from "@react-pdf/renderer";
import Logo from "../../assets/images/Logo/logo.png";
import PopRegular from "../../assets/Fonts/Montserrat-Regular.ttf";
import PopBold from "../../assets/Fonts/Montserrat-Bold.ttf";
import PopBoldItalic from "../../assets/Fonts/AbrilFatface-Regular.ttf";
import PopSemiboldItalic from "../../assets/Fonts/Montserrat-MediumItalic.ttf";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { useTranslation } from "react-i18next";
import { FileOpener } from "@capacitor-community/file-opener";
import { useState } from "react";
import { IonIcon } from "@ionic/react";

interface Transaction {
  refInvoiceId: number;
  refTransactionDate: string;
  refPkgName: string;
  refTransactionAmount: number;
  refPkgDescription: string;
  refTransactionCGST: number;
  refTransactionSGST: number;
  refTransactionKey: string;
  refTransactionMethod: string;
  refPkgValidDays: number;
  refUserEmail: string;
  refUserMobileno: string;
  refUserFname: string;
  refUserLname: string;
  refUserCustId: string;
  refAddress: string;
}

const InvoicePDF: React.FC<Transaction> = ({
  refInvoiceId,
  refTransactionDate,
  refPkgName,
  refPkgDescription,
  refTransactionAmount,
  refTransactionCGST,
  refTransactionSGST,
  refTransactionMethod,
  refTransactionKey,
  refPkgValidDays,
  refUserEmail,
  refUserMobileno,
  refUserFname,
  refUserLname,
  refUserCustId,
  refAddress,
}) => {
  Font.register({
    family: "PopRegular",
    src: PopRegular,
  });

  Font.register({
    family: "PopBoldItalic",
    src: PopBoldItalic,
  });

  Font.register({
    family: "PopBold",
    src: PopBold,
  });

  Font.register({
    family: "PopSemiboldItalic",
    src: PopSemiboldItalic,
  });

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        if (reader.result) {
          const base64data = reader.result.toString().split(",")[1]; // Extract actual Base64 content
          resolve(base64data);
        } else {
          reject(new Error("Failed to convert Blob to Base64"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const { t } = useTranslation("global");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInvoiceDownload = async () => {
    setLoading(true);
    const doc = (
      <Document>
        <Page size="A4">
          <View style={{ width: "100%", height: "100%", padding: "40px" }}>
            <View style={{ width: "100%", height: "100%" }}>
              <View
                style={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View>
                  <Image src={Logo} style={{ width: "200px" }} />
                  <View style={{ marginTop: "30px" }}>
                    <Text
                      style={{ fontSize: "13px", fontFamily: "PopRegular" }}
                    >
                      0427 3562462
                    </Text>
                    <Text
                      style={{ fontSize: "13px", fontFamily: "PopRegular" }}
                    >
                      info@zadroit.com
                    </Text>
                    <Text
                      style={{ fontSize: "13px", fontFamily: "PopRegular" }}
                    >
                      38/37b Logi Street, Gugai,
                    </Text>
                    <Text
                      style={{ fontSize: "13px", fontFamily: "PopRegular" }}
                    >
                      Salem, Tamil Nadu - 636006.
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: "50px", fontFamily: "PopBold" }}>
                    INVOICE
                  </Text>
                  <View
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text
                      style={{ fontSize: "13px", fontFamily: "PopRegular" }}
                    >
                      Invoice No: {refInvoiceId}
                    </Text>
                    <Text
                      style={{ fontSize: "13px", fontFamily: "PopRegular" }}
                    >
                      {refTransactionDate}
                    </Text>
                    <Text
                      style={{ fontSize: "13px", fontFamily: "PopRegular" }}
                    >
                      {refUserFname} {refUserLname}
                    </Text>
                    <Text
                      style={{ fontSize: "13px", fontFamily: "PopRegular" }}
                    >
                      {refUserEmail}
                    </Text>
                    <Text
                      style={{ fontSize: "13px", fontFamily: "PopRegular" }}
                    >
                      {refUserMobileno}
                    </Text>
                    <Text
                      style={{ fontSize: "13px", fontFamily: "PopRegular" }}
                    >
                      {refAddress}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  marginTop: "100px",
                  borderTop: "1px solid #000",
                  borderBottom: "1px solid #000",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    width: "20%",
                    fontSize: "16px",
                    fontFamily: "PopBold",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "5px",
                    paddingRight: "10px",
                  }}
                >
                  Plan
                </Text>
                <Text
                  style={{
                    width: "28%",
                    fontSize: "16px",
                    fontFamily: "PopBold",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "5px",
                    paddingRight: "10px",
                  }}
                >
                  Validity Days
                </Text>
                <Text
                  style={{
                    width: "35%",
                    fontSize: "16px",
                    fontFamily: "PopBold",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "5px",
                    paddingRight: "10px",
                  }}
                >
                  Description
                </Text>
                <Text
                  style={{
                    width: "17%",
                    fontSize: "16px",
                    fontFamily: "PopBold",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "5px",
                    paddingRight: "10px",
                  }}
                >
                  Price
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  borderBottom: "1px solid #000",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    width: "20%",
                    fontSize: "14px",
                    fontFamily: "PopRegular",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "5px",
                    paddingRight: "10px",
                  }}
                >
                  {refPkgName}
                </Text>
                <Text
                  style={{
                    width: "28%",
                    fontSize: "14px",
                    fontFamily: "PopRegular",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "5px",
                    paddingRight: "10px",
                  }}
                >
                  {refPkgValidDays} Days
                </Text>
                <Text
                  style={{
                    width: "35%",
                    fontSize: "14px",
                    fontFamily: "PopRegular",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "5px",
                    paddingRight: "10px",
                  }}
                >
                  {refPkgDescription}
                </Text>
                <Text
                  style={{
                    width: "17%",
                    fontSize: "14px",
                    fontFamily: "PopRegular",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "5px",
                    paddingRight: "10px",
                  }}
                >
                  Rs. {refTransactionAmount}
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    width: "40%",
                    borderBottom: "1px solid #000",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      width: "58%",
                      fontSize: "14px",
                      fontFamily: "PopRegular",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingLeft: "5px",
                      paddingRight: "10px",
                    }}
                  >
                    SGST (9%)
                  </Text>
                  <Text
                    style={{
                      width: "42%",
                      fontSize: "14px",
                      fontFamily: "PopRegular",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingLeft: "5px",
                      paddingRight: "10px",
                    }}
                  >
                    Rs. {refTransactionSGST}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    width: "40%",
                    borderBottom: "1px solid #000",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      width: "58%",
                      fontSize: "14px",
                      fontFamily: "PopRegular",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingLeft: "5px",
                      paddingRight: "10px",
                    }}
                  >
                    CGST (9%)
                  </Text>
                  <Text
                    style={{
                      width: "42%",
                      fontSize: "14px",
                      fontFamily: "PopRegular",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingLeft: "5px",
                      paddingRight: "10px",
                    }}
                  >
                    Rs. {refTransactionCGST}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    width: "40%",
                    borderBottom: "1px solid #000",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      width: "58%",
                      fontSize: "14px",
                      fontFamily: "PopBold",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingLeft: "5px",
                      paddingRight: "10px",
                    }}
                  >
                    Total
                  </Text>
                  <Text
                    style={{
                      width: "42%",
                      fontSize: "14px",
                      fontFamily: "PopBold",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingLeft: "5px",
                      paddingRight: "10px",
                    }}
                  >
                    Rs.{" "}
                    {refTransactionAmount +
                      refTransactionSGST +
                      refTransactionCGST}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: "80px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                }}
              >
                <Text style={{ fontSize: "14px", fontFamily: "PopRegular" }}>
                  *Payment Method:
                </Text>
                <Text
                  style={{
                    fontSize: "14px",
                    fontFamily: "PopSemiboldItalic",
                    textTransform: "uppercase",
                  }}
                >
                  {refTransactionMethod}
                </Text>
              </View>
              <View
                style={{
                  marginTop: "5px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                }}
              >
                <Text style={{ fontSize: "14px", fontFamily: "PopRegular" }}>
                  *Transaction ID:
                </Text>
                <Text
                  style={{ fontSize: "14px", fontFamily: "PopSemiboldItalic" }}
                >
                  {refTransactionKey}
                </Text>
              </View>
              <View
                style={{
                  marginTop: "80px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    fontSize: "18px",
                    fontFamily: "PopBoldItalic",
                    textAlign: "center",
                  }}
                >
                  WE APPRECIATE YOUR TRUST IN OUR CARE
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );

    try {
      // Generate PDF as Blob
      const pdfBlob = await pdf(doc).toBlob();

      // Convert Blob to Base64
      const base64data = await blobToBase64(pdfBlob);

      // Save PDF file
      const savedFile = await Filesystem.writeFile({
        path: `Medpredit_Invoice_${refInvoiceId}.pdf`,
        data: base64data,
        directory: Directory.Documents,
      });

      console.log("PDF saved:", savedFile);
      setLoading(false);
      // Open the file using FileOpener
      await FileOpener.open({
        filePath: savedFile.uri,
        contentType: "application/pdf",
      });

      console.log("PDF saved successfully!");
    } catch (error) {
      console.error("Error generating or saving PDF:", error);
    }

    // try {
    //   // Generate PDF as Blob
    //   const pdfBlob = await pdf(doc).toBlob();

    //   // Create a URL for the Blob
    //   const url = URL.createObjectURL(pdfBlob);

    //   // Create an anchor element and trigger download
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = `Medpredit_Invoice_${refInvoiceId}.pdf`;
    //   document.body.appendChild(a);
    //   a.click();

    //   // Cleanup
    //   document.body.removeChild(a);
    //   URL.revokeObjectURL(url);

    //   console.log("PDF downloaded successfully!");
    // } catch (error) {
    //   console.error("Error generating or downloading PDF:", error);
    // }
  };

  return (
    <div>
      <div
        onClick={handleInvoiceDownload}
        style={{
          fontSize: "0.8rem",
          margin: "0.4rem",
          color: "var(--med-dark-green)",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
        }}
      >
        <span style={{ textDecoration: "underline" }}>
          {t("transactionhis.Download Invoice")}{" "}
        </span>
        {loading && <i className="pi pi-spin pi-spinner"></i>}
      </div>
    </div>
  );
};

export default InvoicePDF;
