import Editor from "../../../components/Editor";
import Layout from '@theme/Layout';
import html from "./html";
import ts from "./main";

export default function () {
  return (
    <>
      <Layout>
          <Editor
            html={html}
            js={ts}
            css={''}
            mainFile={"main.ts"}
            canShare={true}
            mainFileSelected={true}
            standalone={true}
          />
      </Layout>
    </>
  )
}