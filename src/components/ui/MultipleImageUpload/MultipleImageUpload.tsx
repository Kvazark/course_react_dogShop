import s from './multipleImageUploadStyled.module.scss';
import React, { useCallback, useState, DragEvent, useRef } from 'react';
import { Button } from '../index';
import { SvgIcon } from '@mui/material';
import { AddPhotoIcon, CloseIcon } from '../../../assets/images';

type TMultipleImageUploadProps = {
	onUpload: (files: File[]) => void;
	onRemove: (index: number) => void;
};

export const MultipleImageUpload = ({
	onUpload,
	onRemove,
}: TMultipleImageUploadProps) => {
	const [files, setFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleAddPhotoClick = () => fileInputRef?.current?.click();

	const handleDrop = useCallback(
		(event: DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			const newFiles = Array.from(event.dataTransfer.files);
			setFiles((prevFiles) => [...prevFiles, ...newFiles]);
			onUpload(newFiles);
		},
		[onUpload]
	);

	const handleFileInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const newFiles = Array.from(event.target.files || []);
			setFiles((prevFiles) => [...prevFiles, ...newFiles]);
			onUpload(newFiles);
		},
		[onUpload]
	);

	const handleRemove = useCallback(
		(index: number) => {
			const newFiles = [...files];
			newFiles.splice(index, 1);
			setFiles(newFiles);
			onRemove(index);
		},
		[files, onRemove]
	);
	return (
		<div
			className={s.multipleUpload}
			onDragOver={(event) => event.preventDefault()}
			onDrop={handleDrop}>
			<div className={s.multipleUpload_previewList}>
				{files.map((file, index) => (
					<div key={index} className={s.preview}>
						<img src={URL.createObjectURL(file)} alt={file.name} />
						<div className={s.preview_close}>
							<Button
								label={
									<SvgIcon
										component={CloseIcon}
										sx={{ width: '10px', height: '10px' }}
									/>
								}
								view='transparent'
								onClick={() => handleRemove(index)}
							/>
						</div>
					</div>
				))}
				<div className={s.multipleUpload_addPhotoBtn}>
					<SvgIcon
						onClick={handleAddPhotoClick}
						component={AddPhotoIcon}
						sx={{ width: '24px', height: '24px' }}
					/>
				</div>
				<label className='file-input-label'>
					<input
						type='file'
						multiple
						onChange={handleFileInputChange}
						ref={fileInputRef}
					/>
					Нажмите на кнопку или перетащите фото в эту область
				</label>
			</div>
		</div>
	);
};
