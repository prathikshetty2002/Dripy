import Layout from "@/components/Layout";
import { useAuth } from "@/firebase/context";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Seller() {
    const { user, loading } = useAuth();

    if (!user && !loading) useRouter().push("/seller/login");

    return (
        <Layout noCategories >
        <div className="">
          <Head>
            <title>Dripy</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
        </div>
        </Layout>
    )
}