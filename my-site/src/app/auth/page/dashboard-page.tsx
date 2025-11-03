import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@heroui/react";
import {
  Upload,
  FolderPlus,
  Award,
  FolderOpen,
  FileCheck,
  Trash2,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Dialogs
import UploadImageDialog from "../../auth/components/uploadimage";
import CreateCertificationDialog from "../../auth/components/certifiction-create";
import CreateProjectDialog from "../../auth/components/project-create";
import UpdateProjectDialog from "../../auth/components/project-update";
import UpdateCertificationDialog from "../../auth/components/certification-update";
import DeleteProjectDialog from "../../auth/components/project-delete";
import DeleteCertificationDialog from "../../auth/components/certification-delete";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const adminActions = [
    {
      title: "Upload Image",
      description: "Fazer upload de novas imagens",
      icon: Upload,
      dialogId: "upload-image",
    },
    {
      title: "Create Project",
      description: "Criar novo projeto",
      icon: FolderPlus,
      dialogId: "create-project",
    },
    {
      title: "Create Certification",
      description: "Criar nova certificação",
      icon: Award,
      dialogId: "create-certification",
    },
    {
      title: "Update Project",
      description: "Atualizar projeto existente",
      icon: FolderOpen,
      dialogId: "update-project",
    },
    {
      title: "Update Certification",
      description: "Atualizar certificação existente",
      icon: FileCheck,
      dialogId: "update-certification",
    },
    {
      title: "Delete Project",
      description: "Remover projeto existente",
      icon: Trash2,
      dialogId: "delete-project",
      variant: "danger" as const,
    },
    {
      title: "Delete Certification",
      description: "Remover certificação existente",
      icon: Trash2,
      dialogId: "delete-certification",
      variant: "danger" as const,
    },
  ];

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-background to-content1 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-4xl font-bold md:text-5xl text-primary">
              Admin Dashboard
            </h1>
            <p className="text-sm text-default-600 md:text-base">
              Gerencie projetos, certificações e imagens
            </p>
          </div>
          <Button
            color="danger"
            variant="flat"
            startContent={<LogOut size={18} />}
            onPress={handleLogout}
            className="w-full md:w-auto"
          >
            Sair
          </Button>
        </div>

        <Divider className="mb-8" />

        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {adminActions.map((action, index) => {
            const Icon = action.icon;
            const isDanger = action.variant === "danger";

            return (
              <Card
                key={index}
                isPressable
                onPress={() => setOpenDialog(action.dialogId)}
                className="transition-transform duration-300 group hover:scale-105"
                shadow="sm"
              >
                <CardHeader className="flex gap-3 pb-2">
                  <div
                    className={`p-3 rounded-lg ${
                      isDanger
                        ? "bg-danger-50 dark:bg-danger-100/10"
                        : "bg-primary-50 dark:bg-primary-100/10"
                    }`}
                  >
                    <Icon
                      size={24}
                      className={isDanger ? "text-danger" : "text-primary"}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3
                      className={`text-lg font-semibold ${
                        isDanger ? "text-danger" : "text-primary"
                      }`}
                    >
                      {action.title}
                    </h3>
                  </div>
                </CardHeader>
                <CardBody className="py-2">
                  <p className="text-sm text-default-500">
                    {action.description}
                  </p>
                </CardBody>
                <CardFooter className="pt-2">
                  <Button
                    fullWidth
                    color={isDanger ? "danger" : "primary"}
                    variant={isDanger ? "flat" : "solid"}
                    size="sm"
                  >
                    {isDanger ? "Remover" : "Executar"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Dialogs */}
      <UploadImageDialog
        open={openDialog === "upload-image"}
        onOpenChange={(open) => setOpenDialog(open ? "upload-image" : null)}
      />
      <CreateProjectDialog
        open={openDialog === "create-project"}
        onOpenChange={(open) => setOpenDialog(open ? "create-project" : null)}
      />
      <CreateCertificationDialog
        open={openDialog === "create-certification"}
        onOpenChange={(open) =>
          setOpenDialog(open ? "create-certification" : null)
        }
      />
      <UpdateProjectDialog
        open={openDialog === "update-project"}
        onOpenChange={(open) => setOpenDialog(open ? "update-project" : null)}
      />
      <UpdateCertificationDialog
        open={openDialog === "update-certification"}
        onOpenChange={(open) =>
          setOpenDialog(open ? "update-certification" : null)
        }
      />
      <DeleteProjectDialog
        open={openDialog === "delete-project"}
        onOpenChange={(open) => setOpenDialog(open ? "delete-project" : null)}
      />
      <DeleteCertificationDialog
        open={openDialog === "delete-certification"}
        onOpenChange={(open) =>
          setOpenDialog(open ? "delete-certification" : null)
        }
      />
    </div>
  );
};
