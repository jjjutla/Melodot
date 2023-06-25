#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
	use frame_support::{pallet_prelude::*, storage::bounded_vec::BoundedVec};
	use frame_system::pallet_prelude::*;

	#[pallet::pallet]
	#[pallet::generate_store(pub(super) trait Store)]
	pub struct Pallet<T>(_);
	#[pallet::config]
	pub trait Config: frame_system::Config {
		type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
		type FullTrackCid: Get<u32>;
		type MusicId: Get<u32>;
		type Artist: Get<u32>;
		type TrackTitle: Get<u32>;
		type Album: Get<u32>;
		type Bpm: Get<u32>;
		type Key: Get<u32>;
		type TimeSignature: Get<u32>;
		type Bars: Get<u32>;
		type Beats: Get<u32>;
		type Duration: Get<u32>;
		type StartBeatOffsetMs: Get<u32>;
		type SectionsCount: Get<u32>;
		type StemsCount: Get<u32>;
		type SectionName: Get<u32>;
		type SectionStartTimeMs: Get<u32>;
		type SectionEndTimeMs: Get<u32>;
		type StemCid: Get<u32>;
		type StemName: Get<u32>;
		type StemType: Get<u32>;
	}

	#[pallet::event] 
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		FullTrackCreated(T::AccountId, BoundedVec<u8, T::MusicId>),
		SectionCreated(T::AccountId, BoundedVec<u8, T::MusicId>),
		StemCreated(T::AccountId, BoundedVec<u8, T::MusicId>),
	}

	#[pallet::error] 
	pub enum Error<T> {

		ProofAlreadyClaimed,

		NoSuchProof,

		NotProofOwner,
	}

	#[pallet::storage] 
	pub(super) type FullTracks<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		BoundedVec<u8, T::MusicId>,
		(
			T::AccountId,
			BoundedVec<u8, T::FullTrackCid>,
			BoundedVec<u8, T::Artist>,
			BoundedVec<u8, T::TrackTitle>,
			BoundedVec<u8, T::Album>,
			BoundedVec<u8, T::Genre>,
			BoundedVec<u8, T::Bpm>,
			BoundedVec<u8, T::Key>,
			BoundedVec<u8, T::TimeSignature>,
			BoundedVec<u8, T::Bars>,
			BoundedVec<u8, T::Beats>,
			BoundedVec<u8, T::Duration>,
			BoundedVec<u8, T::StartBeatOffsetMs>,
			BoundedVec<u8, T::SectionsCount>,
			BoundedVec<u8, T::StemsCount>,
			T::BlockNumber,
		),
		OptionQuery,
	>;
	#[pallet::storage]

	pub(super) type Sections<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		BoundedVec<u8, T::MusicId>,
		(
			T::AccountId,
			BoundedVec<u8, T::SectionName>,
			BoundedVec<u8, T::SectionStartTimeMs>,
			BoundedVec<u8, T::SectionEndTimeMs>,
			BoundedVec<u8, T::Bars>,
			BoundedVec<u8, T::Beats>,
			T::BlockNumber,
		),
		OptionQuery,
	>;

	#[pallet::storage]

	pub(super) type Stems<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		BoundedVec<u8, T::MusicId>,
		(
			T::AccountId,
			BoundedVec<u8, T::StemCid>,
			BoundedVec<u8, T::StemName>,
			BoundedVec<u8, T::StemType>,
			T::BlockNumber,
		),
		OptionQuery,
	>;

	#[pallet::call] 
	impl<T: Config> Pallet<T> {
		#[pallet::weight(1_000)]
		pub fn create_fulltrack(
			origin: OriginFor<T>,
			music_id: BoundedVec<u8, T::MusicId>,
			music_file: BoundedVec<u8, T::FullTrackCid>,
			artist: BoundedVec<u8, T::Artist>,
			track_title: BoundedVec<u8, T::TrackTitle>,
			album: BoundedVec<u8, T::Album>,
			genre: BoundedVec<u8, T::Genre>,
			bpm: BoundedVec<u8, T::Bpm>,
			key: BoundedVec<u8, T::Key>,
			time_signature: BoundedVec<u8, T::TimeSignature>,
			bars: BoundedVec<u8, T::Bars>,
			beats: BoundedVec<u8, T::Beats>,
			duration: BoundedVec<u8, T::Duration>,
			start_beat_offset_ms: BoundedVec<u8, T::StartBeatOffsetMs>,
			no_of_sections: BoundedVec<u8, T::SectionsCount>,
			no_of_stems: BoundedVec<u8, T::StemsCount>,
		) -> DispatchResult {

			let sender = ensure_signed(origin)?;

			let current_block = <frame_system::Pallet<T>>::block_number();

			FullTracks::<T>::insert(
				&music_id,
				(
					&sender,
					music_file,
					artist,
					track_title,
					album,
					genre,
					bpm,
					key,
					time_signature,
					bars,
					beats,
					duration,
					start_beat_offset_ms,
					no_of_sections,
					no_of_stems,
					current_block,
				),
			);

			Self::deposit_event(Event::FullTrackCreated(sender, music_id));

			Ok(())
		}

		#[pallet::weight(10_000)]
		pub fn create_section(
			origin: OriginFor<T>,
			music_id: BoundedVec<u8, T::MusicId>,
			section_name: BoundedVec<u8, T::SectionName>,
			start_time_ms: BoundedVec<u8, T::SectionStartTimeMs>,
			end_time_ms: BoundedVec<u8, T::SectionEndTimeMs>,
			bars: BoundedVec<u8, T::Bars>,
			beats: BoundedVec<u8, T::Beats>,
		) -> DispatchResult {

			let sender = ensure_signed(origin)?;

			let current_block = <frame_system::Pallet<T>>::block_number();
			Sections::<T>::insert(
				&music_id,
				(&sender, section_name, start_time_ms, end_time_ms, bars, beats, current_block),
			);

			Self::deposit_event(Event::SectionCreated(sender, music_id));
			Ok(())
		}

		#[pallet::weight(10_000)]
		pub fn create_stem(
			origin: OriginFor<T>,
			music_id: BoundedVec<u8, T::MusicId>,
			stem_cid: BoundedVec<u8, T::StemCid>,
			stem_name: BoundedVec<u8, T::StemName>,
			stem_type: BoundedVec<u8, T::StemType>,
		) -> DispatchResult {
			let sender = ensure_signed(origin)?;
			let current_block = <frame_system::Pallet<T>>::block_number();
			Stems::<T>::insert(&music_id, (&sender, stem_cid, stem_name, stem_type, current_block));
			Self::deposit_event(Event::StemCreated(sender, music_id));
			Ok(())
		}
	}
}
