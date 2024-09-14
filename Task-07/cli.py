import click
import os
from subtitle_utils import find_imdb_id, find_subtitles, download_subtitle, process_directory

@click.command()
@click.argument('file', type=click.Path(exists=True))
@click.option('-l', '--language', default=None, help='Filter subtitles by language.')
@click.option('-o', '--output', default='.', help='Specify the output folder for the subtitles.')
@click.option('-s', '--file-size', default=None, help='Filter subtitles by movie file size.')
@click.option('-h', '--match-by-hash', default=None, help='Match subtitles by movie hash.')
@click.option('-b', '--batch-download', is_flag=True, help='Enable batch mode for directory.')
def main(file, language, output, file_size, match_by_hash, batch_download):
    """Subtitle downloader CLI"""
    if batch_download:
        process_directory(file, language, output)
    else:
        imdb_id = find_imdb_id(file)
        subtitles = find_subtitles(imdb_id, file_size, match_by_hash, language)
        subtitle_choice = click.prompt('Choose a subtitle to download', type=int)
        download_subtitle(subtitles[subtitle_choice], output)

if __name__ == '__main__':
    main()
