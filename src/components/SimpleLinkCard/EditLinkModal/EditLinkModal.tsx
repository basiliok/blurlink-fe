import { useState } from "react";
import { Modal } from "../../Modal/Modal";
import { Line } from "../../Line";
import { Loading } from "../../Loading/Loading";
import { TrashIcon } from "../../../assets/icons";
import { useUpdateSimpleLink } from "../../../api";
import type { EditLinkModalProps } from "./EditLinkModal.types";

export const EditLinkModal = ({
	isOpen,
	onClose,
	spaceId,
	link,
}: EditLinkModalProps) => {
	const [title, setTitle] = useState<string>(link.title);
	const [url, setUrl] = useState<string>(link.url);
	const { mutate: updateSimpleLink, isPending } = useUpdateSimpleLink(spaceId);

	const clearForm = () => {
		setTitle(link.title);
		setUrl(link.url);
	};

	const handleClose = () => {
		if (isPending) return;
		clearForm();
		onClose();
	};

	const handleSave = () => {
		updateSimpleLink(
			{
				linkId: link.id,
				body: {
					chainId: link.chainId,
					title: title.trim(),
					url: url.trim(),
					note: link.note,
				},
			},
			{
				onSuccess: () => {
					onClose();
				},
			},
		);
	};

	return (
		<Modal
			title={`Editar - ${link.title}`}
			isOpen={isOpen}
			onClose={handleClose}
		>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col rounded-[0.375rem] border border-[#3d444d] bg-[#0d1117]">
					<input
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						// biome-ignore lint/a11y/noAutofocus: focus moves to first input when modal opens, per WAI-ARIA dialog pattern
						autoFocus
						className="w-full px-3 py-2 text-sm text-[#f0f6fc] focus:outline-none"
					/>
					<Line />
					<input
						type="text"
						placeholder="https://example.com"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						className="w-full px-3 py-2 text-sm text-[#9198A1] focus:outline-none"
					/>
				</div>

				<div className="flex justify-between border-t border-[#3d444d] pt-4">
					<button
						type="button"
						disabled={isPending}
						className="flex cursor-pointer items-center gap-2 rounded-[0.375rem] border border-[#6e2020] px-4 py-2 text-sm text-[#f85149] transition-colors hover:bg-[#3d0f0f] active:bg-[#4d1515] disabled:cursor-not-allowed disabled:opacity-50"
					>
						<TrashIcon size="1rem" />
						Eliminar
					</button>

					<div className="flex gap-2">
						<button
							type="button"
							onClick={handleClose}
							disabled={isPending}
							className="cursor-pointer rounded-[0.375rem] border border-[#3d444d] px-4 py-2 text-sm text-[#f0f6fc] transition-colors hover:bg-[#3d444d] active:bg-[#4a525b] disabled:cursor-not-allowed disabled:opacity-50"
						>
							Cancelar
						</button>
						<button
							type="button"
							onClick={handleSave}
							disabled={isPending}
							className="flex cursor-pointer items-center gap-2 rounded-[0.375rem] bg-[#238636] px-4 py-2 text-sm text-[#f0f6fc] transition-colors hover:bg-[#29903b] active:bg-[#1a7f2e] disabled:cursor-not-allowed disabled:opacity-50"
						>
							{isPending && <Loading size={"1rem"} />}
							{isPending ? "Guardando..." : "Guardar"}
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
};
