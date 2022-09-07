import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import {UsersRepositoryInMemory} from "../../repositories/in-memory/UsersRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Mail", () => {

    beforeEach(() => {
        MailProviderInMemory
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProviderInMemory = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory, usersTokensRepositoryInMemory, 
            dateProvider, mailProviderInMemory
        );
    });

    it("should be albe to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProviderInMemory, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "770815",
            email: "dumzerovo@noogage.ss",
            name: "Christian Doyle",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("dumzerovo@noogage.ss");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be albe to sendo an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("pasvu@wopu.bo"
        ))
        .rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = spyOn(usersTokensRepositoryInMemory,"create");

        await usersRepositoryInMemory.create({
            driver_license: "925510",
            email: "dalzog@ja.net",
            name: "Adelaide Harper",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("dalzog@ja.net");

        expect(generateTokenMail).toBeCalled();
    });
});