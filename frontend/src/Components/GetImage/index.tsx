import { useEffect, useState } from "react";
import {
  GetObjectCommand,
  ListObjectsCommand,
  ListObjectsCommandOutput,
  PutObjectCommand,
  S3,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const GetImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const client = new S3Client({
    region: "us-east-1",
    // Unless you have a public bucket, you'll need access to a private bucket.
    // One way to do this is to create an Amazon Cognito identity pool, attach a role to the pool,
    // and grant the role access to the 's3:GetObject' action.
    //
    // You'll also need to configure the CORS settings on the bucket to allow traffic from
    // this example site. Here's an example configuration that allows all origins. Don't
    // do this in production.
    //[
    //  {
    //    "AllowedHeaders": ["*"],
    //    "AllowedMethods": ["GET"],
    //    "AllowedOrigins": ["*"],
    //    "ExposeHeaders": [],
    //  },
    //]
    //
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: "us-east-1" },
      identityPoolId: "us-east-1:70c0ffbf-d7f8-450e-be10-db5c4b63ec35",
    }),
  });

  const [objects, setObjects] = useState<
    Required<ListObjectsCommandOutput>["Contents"]
  >([]);

  const getData = async (key: string) => {
    const command = new GetObjectCommand({
      Bucket: "the-cocktail-club-co-images",
      Key: key,
    });

    await getSignedUrl(client, command, { expiresIn: 3600 }).then((res) => {
      setImageUrl(res);
    });
  };

  useEffect(() => {
    const command = new ListObjectsCommand({
      Bucket: "the-cocktail-club-co-images",
    });
    client.send(command).then(({ Contents }) => {
      setObjects(Contents || []);
    });
    getData("Mikheila3 BW 2.JPG");
  }, []);

  console.log(objects);

  return (
    <div id="test">
      {objects.map((o) => {
        console.log(o.Key);
        return (
          <div key={o.ETag}>
            <img width={200} src={imageUrl} />
          </div>
        );
      })}
    </div>
  );
};

export default GetImage;
