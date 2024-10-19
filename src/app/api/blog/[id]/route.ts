import { connect } from "@/app/api/blog/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// ブログの詳細記事取得用API
export const GET = async (req: Request, res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);
        await connect();
        const post = await prisma.post.findFirst({ where: { id } });

        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// ブログ編集用API
export const PUT = async (req: Request, res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);
        const { title, description } = await req.json();

        await connect();
        const post = await prisma.post.update({
            data: { title, description },
            where: { id },
        });

        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// ブログ削除用API
export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);

        await connect();
        const post = await prisma.post.delete({ where: { id } });

        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
