-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "tipo" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyValue" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MonthlyValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "MonthlyValue" ADD CONSTRAINT "MonthlyValue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
